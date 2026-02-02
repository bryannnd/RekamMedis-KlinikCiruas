<?php

namespace App\Http\Controllers;

use App\Models\Poliklinik;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PoliklinikController extends Controller
{
    public function index()
    {
        $polikliniks = Poliklinik::query()
            ->when(request('search'), function ($query, $search) {
                $query->where('nm_poli', 'like', "%{$search}%")
                      ->orWhere('kd_poli', 'like', "%{$search}%");
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Polikliniks/Index', [
            'polikliniks' => $polikliniks,
            'filters' => request()->all(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Polikliniks/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            // 'kd_poli' => 'required|unique:polikliniks|max:10', // Auto
            'nm_poli' => 'required|string|max:255',
            'lantai' => 'required|string|max:10',
        ]);

        // Auto Generate P00X
        $last = Poliklinik::orderBy('kd_poli', 'desc')->first();
        if ($last) {
             $num = intval(substr($last->kd_poli, 1));
             $newCode = 'P' . str_pad($num + 1, 3, '0', STR_PAD_LEFT);
        } else {
             $newCode = 'P001';
        }
        $validated['kd_poli'] = $newCode;

        Poliklinik::create($validated);

        return redirect()->route('polikliniks.index')->with('success', 'Poliklinik berhasil ditambahkan.');
    }

    public function edit(Poliklinik $poliklinik)
    {
        return Inertia::render('Polikliniks/Edit', [
            'poliklinik' => $poliklinik
        ]);
    }

    public function update(Request $request, Poliklinik $poliklinik)
    {
        $validated = $request->validate([
            'nm_poli' => 'required|string|max:255',
            'lantai' => 'required|string|max:10',
        ]);

        $poliklinik->update($validated);

        return redirect()->route('polikliniks.index')->with('success', 'Poliklinik berhasil diperbarui.');
    }

    public function destroy(Poliklinik $poliklinik)
    {
        $poliklinik->delete();

        return redirect()->route('polikliniks.index')->with('success', 'Poliklinik berhasil dihapus.');
    }
}
