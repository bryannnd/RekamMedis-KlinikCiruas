<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Pasien;
use App\Models\Dokter;
use App\Models\Poliklinik;
use App\Models\Kunjungan;
use App\Models\User;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $role = $user->role;

        $stats = [];

        if (in_array($role, ['admin', 'manajer'])) {
            $stats = [
                ['label' => 'Total Pasien', 'value' => Pasien::count(), 'icon' => 'Users', 'color' => 'blue'],
                ['label' => 'Total Dokter', 'value' => Dokter::count(), 'icon' => 'Stethoscope', 'color' => 'emerald'],
                ['label' => 'Total Poliklinik', 'value' => Poliklinik::count(), 'icon' => 'Building2', 'color' => 'purple'],
                ['label' => 'Kunjungan Hari Ini', 'value' => Kunjungan::whereDate('tgl_registrasi', Carbon::today())->count(), 'icon' => 'ClipboardList', 'color' => 'teal'],
            ];
        } elseif ($role === 'petugas') {
            $stats = [
                ['label' => 'Total Pasien', 'value' => Pasien::count(), 'icon' => 'Users', 'color' => 'blue'],
                ['label' => 'Kunjungan Hari Ini', 'value' => Kunjungan::whereDate('tgl_registrasi', Carbon::today())->count(), 'icon' => 'ClipboardList', 'color' => 'teal'],
                ['label' => 'Pasien Baru (Bulan Ini)', 'value' => Pasien::whereMonth('created_at', Carbon::now()->month)->count(), 'icon' => 'UserPlus', 'color' => 'orange'],
            ];
        } elseif ($role === 'dokter') {
             // Assuming dokter is linked to user via some relation or just show generic stats for now if relationship logic is complex
             // Ideally: $dokter = Dokter::where('user_id', $user->id)->first();
             // For now, simpler query:
            $stats = [
                ['label' => 'Kunjungan Hari Ini', 'value' => Kunjungan::whereDate('tgl_registrasi', Carbon::today())->count(), 'icon' => 'ClipboardList', 'color' => 'teal'],
                ['label' => 'Total Pasien', 'value' => Pasien::count(), 'icon' => 'Users', 'color' => 'blue'],
            ];
        } else {
             // Default fallthrough
             $stats = [
                 ['label' => 'Total Pasien', 'value' => Pasien::count(), 'icon' => 'Users', 'color' => 'blue'],
            ];
        }

        return Inertia::render('Dashboard', [
            'stats' => $stats
        ]);
    }
}
