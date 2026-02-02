<?php

namespace App\Http\Controllers;

use App\Models\Pasien;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PasienController extends Controller
{
    public function index()
    {
        $pasiens = Pasien::query()
            ->when(request('search'), function ($query, $search) {
                $query->where('nm_pasien', 'like', "%{$search}%")
                      ->orWhere('no_pasien', 'like', "%{$search}%");
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Pasiens/Index', [
            'pasiens' => $pasiens,
            'filters' => request()->all(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Pasiens/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            // 'no_pasien' => 'required|unique:pasiens|max:10', // Auto generated
            'nm_pasien' => 'required|string|max:100',
            'jk' => 'required|in:L,P',
            'tgl_lhr' => 'required|date',
            'alamat' => 'nullable|string',
            'no_tlp' => 'nullable|string|max:20',
            'nm_kk' => 'nullable|string|max:100',
            'hub_kel' => 'nullable|string|max:50',
        ]);

        // Auto Generate No Pasien: PS-XXXX
        $lastPasien = Pasien::orderBy('no_pasien', 'desc')->first();
        if ($lastPasien) {
            // Extract number, assuming format PS-XXXX
            // Handle if previous format was different, but going forward use PS-
            $lastNo = intval(substr($lastPasien->no_pasien, 3));
            $newNo = 'PS-' . str_pad($lastNo + 1, 4, '0', STR_PAD_LEFT);
        } else {
            $newNo = 'PS-0001';
        }

        $validated['no_pasien'] = $newNo;

        Pasien::create($validated);

        return redirect()->route('pasiens.index')->with('success', 'Pasien berhasil ditambahkan with ID: ' . $newNo);
    }

    public function edit(Pasien $pasien)
    {
        return Inertia::render('Pasiens/Edit', [
            'pasien' => $pasien
        ]);
    }

    public function update(Request $request, Pasien $pasien)
    {
        $validated = $request->validate([
            'nm_pasien' => 'required|string|max:100',
            'jk' => 'required|in:L,P',
            'tgl_lhr' => 'required|date',
            'alamat' => 'nullable|string',
            'no_tlp' => 'nullable|string|max:20',
            'nm_kk' => 'nullable|string|max:100',
            'hub_kel' => 'nullable|string|max:50',
        ]);

        $pasien->update($validated);

        return redirect()->route('pasiens.index')->with('success', 'Data pasien berhasil diperbarui.');
    }

    public function destroy(Pasien $pasien)
    {
        $pasien->delete();

        return redirect()->route('pasiens.index')->with('success', 'Data pasien berhasil dihapus.');
    }
}
