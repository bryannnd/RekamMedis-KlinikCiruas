<?php

namespace App\Http\Controllers;

use App\Models\Obat;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ObatController extends Controller
{
    public function index()
    {
        $obats = Obat::query()
            ->when(request('search'), function ($query, $search) {
                $query->where('nm_obat', 'like', "%{$search}%")
                      ->orWhere('kd_obat', 'like', "%{$search}%");
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Obats/Index', [
            'obats' => $obats,
            'filters' => request()->all(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Obats/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            // 'kd_obat' => 'required|unique:obats|max:10', // Auto
            'nm_obat' => 'required|string|max:255',
            'jml_obat' => 'required|integer|min:0',
            'ukuran' => 'required|string|max:20',
            'harga' => 'required|numeric|min:0',
        ]);

        // Auto Generate O00X
        $last = Obat::orderBy('kd_obat', 'desc')->first();
        if ($last) {
             $num = intval(substr($last->kd_obat, 1));
             $newCode = 'O' . str_pad($num + 1, 3, '0', STR_PAD_LEFT);
        } else {
             $newCode = 'O001';
        }
        $validated['kd_obat'] = $newCode;

        Obat::create($validated);

        return redirect()->route('obats.index')->with('success', 'Obat berhasil ditambahkan.');
    }

    public function edit(Obat $obat)
    {
        return Inertia::render('Obats/Edit', [
            'obat' => $obat
        ]);
    }

    public function update(Request $request, Obat $obat)
    {
        $validated = $request->validate([
            'nm_obat' => 'required|string|max:255',
            'jml_obat' => 'required|integer|min:0',
            'ukuran' => 'required|string|max:20',
            'harga' => 'required|numeric|min:0',
        ]);

        $obat->update($validated);

        return redirect()->route('obats.index')->with('success', 'Obat berhasil diperbarui.');
    }

    public function destroy(Obat $obat)
    {
        $obat->delete();

        return redirect()->route('obats.index')->with('success', 'Obat berhasil dihapus.');
    }
}
