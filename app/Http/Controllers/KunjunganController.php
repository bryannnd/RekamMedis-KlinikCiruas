<?php

namespace App\Http\Controllers;

use App\Models\Kunjungan;
use App\Models\Pasien;
use App\Models\Dokter;
use App\Models\Poliklinik;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Carbon;

class KunjunganController extends Controller
{
    public function index()
    {
        $kunjungans = Kunjungan::query()
            ->with(['pasien', 'dokter', 'poliklinik'])
            ->when(request('search'), function ($query, $search) {
                // Advanced search: by no_rawat OR pasien name
                $query->where('no_rawat', 'like', "%{$search}%")
                      ->orWhereHas('pasien', function ($q) use ($search) {
                          $q->where('nm_pasien', 'like', "%{$search}%");
                      });
            })
            ->orderBy('tgl_registrasi', 'desc')
            ->orderBy('jam_registrasi', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Kunjungans/Index', [
            'kunjungans' => $kunjungans,
            'filters' => request()->all(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Kunjungans/Create', [
            'pasiens' => Pasien::select('no_pasien', 'nm_pasien')->get(), // Optimize load
            'dokters' => Dokter::select('kd_dokter', 'nm_dokter', 'kd_poli')->with('poliklinik')->get(),
            'polikliniks' => Poliklinik::all()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'no_pasien' => 'required|exists:pasiens,no_pasien',
            'kd_dokter' => 'required|exists:dokters,kd_dokter',
            'kd_poli' => 'required|exists:polikliniks,kd_poli',
            'tgl_registrasi' => 'required|date',
            // no_rawat is auto-generated
        ]);

        // Auto-generate No Rawat: YYYY/MM/DD/XXXX (e.g., 2024/01/17/0001)
        $date = Carbon::parse($validated['tgl_registrasi']);
        $prefix = $date->format('Y/m/d/');
        
        // Find last no_rawat for this date
        $lastKunjungan = Kunjungan::where('no_rawat', 'like', $prefix . '%')
            ->orderBy('no_rawat', 'desc')
            ->first();
            
        if ($lastKunjungan) {
            $lastNo = intval(substr($lastKunjungan->no_rawat, -4));
            $newNo = str_pad($lastNo + 1, 4, '0', STR_PAD_LEFT);
        } else {
            $newNo = '0001';
        }
        
        $no_rawat = $prefix . $newNo;

        Kunjungan::create([
            'no_rawat' => $no_rawat,
            'no_pasien' => $validated['no_pasien'],
            'kd_dokter' => $validated['kd_dokter'],
            'kd_poli' => $validated['kd_poli'],
            'tgl_registrasi' => $validated['tgl_registrasi'],
            'jam_registrasi' => Carbon::now()->format('H:i:s'),
            'status_periksa' => 'Belum',
        ]);

        return redirect()->route('kunjungans.index')->with('success', 'Pendaftaran kunjungan berhasil.');
    }
    
    // Edit & Update optional for now, sticking to the main flow.
    // If needed, can implement.
}
