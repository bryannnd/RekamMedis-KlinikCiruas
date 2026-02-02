<?php

namespace App\Http\Controllers;

use App\Models\Tindakan;
use App\Models\Poliklinik;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TindakanController extends Controller
{
    public function index()
    {
        $tindakans = Tindakan::query()
            ->with(['poliklinik'])
            ->when(request('search'), function ($query, $search) {
                $query->where('nm_tindakan', 'like', "%{$search}%")
                      ->orWhere('kd_tindakan', 'like', "%{$search}%");
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Tindakans/Index', [
            'tindakans' => $tindakans,
            'filters' => request()->all(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Tindakans/Create', [
            'polikliniks' => Poliklinik::all()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            // 'kd_tindakan' => 'required|unique:tindakans|max:10', // Auto
            'nm_tindakan' => 'required|string|max:255',
            'kd_poli' => 'nullable|exists:polikliniks,kd_poli',
            'tarif' => 'required|numeric|min:0',
        ]);

        // Auto Generate T00X
        $last = Tindakan::orderBy('kd_tindakan', 'desc')->first();
        if ($last) {
             $num = intval(substr($last->kd_tindakan, 1));
             $newCode = 'T' . str_pad($num + 1, 3, '0', STR_PAD_LEFT);
        } else {
             $newCode = 'T001';
        }
        $validated['kd_tindakan'] = $newCode;

        Tindakan::create($validated);

        return redirect()->route('tindakans.index')->with('success', 'Tindakan berhasil ditambahkan.');
    }

    public function edit(Tindakan $tindakan)
    {
        return Inertia::render('Tindakans/Edit', [
            'tindakan' => $tindakan,
            'polikliniks' => Poliklinik::all()
        ]);
    }

    public function update(Request $request, Tindakan $tindakan)
    {
        $validated = $request->validate([
            'nm_tindakan' => 'required|string|max:255',
            'kd_poli' => 'nullable|exists:polikliniks,kd_poli',
            'tarif' => 'required|numeric|min:0',
        ]);

        $tindakan->update($validated);

        return redirect()->route('tindakans.index')->with('success', 'Tindakan berhasil diperbarui.');
    }

    public function destroy(Tindakan $tindakan)
    {
        $tindakan->delete();

        return redirect()->route('tindakans.index')->with('success', 'Tindakan berhasil dihapus.');
    }
}
