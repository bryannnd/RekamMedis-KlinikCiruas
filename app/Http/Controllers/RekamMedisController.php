<?php

namespace App\Http\Controllers;

use App\Models\RekamMedis;
use App\Models\Kunjungan;
use App\Models\Obat;
use App\Models\Tindakan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class RekamMedisController extends Controller
{
    public function index()
    {
        $rekamMedis = RekamMedis::query()
            ->with(['pasien', 'dokter'])
            ->when(request('search'), function ($query, $search) {
                $query->where('no_rawat', 'like', "%{$search}%")
                      ->orWhereHas('pasien', function ($q) use ($search) {
                          $q->where('nm_pasien', 'like', "%{$search}%");
                      });
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('RekamMedis/Index', [
            'rekams' => $rekamMedis,
            'filters' => request()->all(['search']),
        ]);
    }

    public function create(Request $request)
    {
        $no_rawat = $request->query('no_rawat');
        
        $kunjungan = null;
        if ($no_rawat) {
            $kunjungan = Kunjungan::with(['pasien', 'dokter', 'poliklinik'])
                ->where('no_rawat', $no_rawat)
                ->firstOrFail();
        }

        return Inertia::render('RekamMedis/Create', [
            'kunjungan' => $kunjungan,
            'obats' => Obat::where('jml_obat', '>', 0)->get(), // Only show available
            'tindakans' => Tindakan::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'no_rawat' => 'required|exists:kunjungans,no_rawat|unique:rekam_medis,no_rawat',
            'no_pasien' => 'required|exists:pasiens,no_pasien',
            'kd_dokter' => 'required|exists:dokters,kd_dokter',
            'keluhan' => 'required|string',
            'diagnosa' => 'required|string',
            'tindakan' => 'nullable|array',
            'resep_obat' => 'nullable|array',
        ]);

        DB::transaction(function () use ($validated) {
            // 1. Create Rekam Medis
            RekamMedis::create([
                'no_rawat' => $validated['no_rawat'],
                'no_pasien' => $validated['no_pasien'],
                'kd_dokter' => $validated['kd_dokter'],
                'keluhan' => $validated['keluhan'],
                'diagnosa' => $validated['diagnosa'],
                'tindakan' => $validated['tindakan'] ?? [],
                'resep_obat' => $validated['resep_obat'] ?? [],
            ]);

            // 2. Update Kunjungan status
            Kunjungan::where('no_rawat', $validated['no_rawat'])
                ->update(['status_periksa' => 'Sudah']);

            // 3. Decrease Stock (Simple logic)
            if (isset($validated['resep_obat'])) {
                foreach ($validated['resep_obat'] as $resep) {
                     $obat = Obat::find($resep['kd_obat']);
                     if ($obat && $obat->jml_obat >= $resep['jumlah']) {
                         $obat->decrement('jml_obat', $resep['jumlah']);
                     }
                }
            }
        });

        return redirect()->route('rekam_medis.index')->with('success', 'Pemeriksaan selesai dan data tersimpan.');
    }
    
    public function show(RekamMedis $rekamMedis)
    {
         return Inertia::render('RekamMedis/Show', [
            'rekam' => $rekamMedis->load(['pasien', 'dokter', 'kunjungan.poliklinik']),
        ]);
    }
}
