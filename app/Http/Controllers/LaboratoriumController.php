<?php

namespace App\Http\Controllers;

use App\Models\Laboratorium;
use App\Models\RekamMedis;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Carbon;

class LaboratoriumController extends Controller
{
    public function index()
    {
        $labs = Laboratorium::query()
            ->with(['rekamMedis.pasien'])
            ->when(request('search'), function ($query, $search) {
                $query->where('jenis_pemeriksaan', 'like', "%{$search}%")
                      ->orWhereHas('rekamMedis.pasien', function ($q) use ($search) {
                          $q->where('nm_pasien', 'like', "%{$search}%");
                      });
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Laboratoriums/Index', [
            'labs' => $labs,
            'filters' => request()->all(['search']),
        ]);
    }

    public function create()
    {
        // We need to fetch Rekam Medis that don't have lab results yet OR all to allow multiple.
        // For simplicity, let's just list recent Rekam Medis to attach a lab result to.
        $rekamMedis = RekamMedis::with(['pasien'])
            ->orderBy('created_at', 'desc')
            ->limit(50) // Limit to recent 50 for dropdown performance
            ->get();

        return Inertia::render('Laboratoriums/Create', [
            'rekamMedis' => $rekamMedis
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'no_rawat' => 'required|exists:rekam_medis,no_rawat',
            'jenis_pemeriksaan' => 'required|string|max:255',
            'hasil_periksa' => 'required|string',
            'tgl_periksa' => 'required|date',
        ]);

        Laboratorium::create([
            'no_rawat' => $validated['no_rawat'],
            'jenis_pemeriksaan' => $validated['jenis_pemeriksaan'],
            'hasil_periksa' => $validated['hasil_periksa'],
            'tgl_periksa' => $validated['tgl_periksa'],
            'jam_periksa' => Carbon::now()->format('H:i:s'),
            'kd_petugas' => 'Admin' // Placeholder or Auth::user()->id
        ]);

        return redirect()->route('laboratoriums.index')->with('success', 'Data hasil lab berhasil ditambahkan.');
    }

    public function edit(Laboratorium $laboratorium)
    {
        return Inertia::render('Laboratoriums/Edit', [
            'laboratorium' => $laboratorium
        ]);
    }

    public function update(Request $request, Laboratorium $laboratorium)
    {
        $validated = $request->validate([
            'jenis_pemeriksaan' => 'required|string|max:255',
            'hasil_periksa' => 'required|string',
        ]);

        $laboratorium->update($validated);

        return redirect()->route('laboratoriums.index')->with('success', 'Data hasil lab berhasil diperbarui.');
    }

    public function destroy(Laboratorium $laboratorium)
    {
        $laboratorium->delete();

        return redirect()->route('laboratoriums.index')->with('success', 'Data hasil lab berhasil dihapus.');
    }
}
