<?php

namespace App\Http\Controllers;

use App\Models\Kunjungan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class AntrianController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        $query = Kunjungan::query()
            ->with(['pasien', 'poliklinik', 'dokter'])
            ->where('status_periksa', 'Belum')
            ->whereDate('tgl_registrasi', now());

        // If user is a Doctor, filter by their ID
        if ($user->role === 'dokter') {
            // Assuming the user is linked to a doctor record via user_id
            // We need to fetch the doctor record first
            $dokter = \App\Models\Dokter::where('user_id', $user->id)->first();
            if ($dokter) {
                $query->where('kd_dokter', $dokter->kd_dokter);
            }
        }

        // If Admin/Petugas, they might see all or filter by search
        
        $antrians = $query->orderBy('jam_registrasi', 'asc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Antrian/Index', [
            'antrians' => $antrians,
        ]);
    }
}
