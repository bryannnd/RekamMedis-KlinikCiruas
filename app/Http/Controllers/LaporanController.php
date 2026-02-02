<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Kunjungan;
use App\Models\Obat;
use App\Models\RekamMedis;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class LaporanController extends Controller
{
    public function index()
    {
        // 1. Kunjungan Stats (Last 7 Days)
        $endDate = Carbon::today();
        $startDate = Carbon::today()->subDays(6);
        
        $kunjunganStats = Kunjungan::select(
                DB::raw('DATE(tgl_registrasi) as date'),
                DB::raw('count(*) as count')
            )
            ->whereBetween('tgl_registrasi', [$startDate, $endDate])
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get();

        // 2. Low Stock Medicines (< 10)
        $lowStockObats = Obat::where('jml_obat', '<', 10)
            ->orderBy('jml_obat', 'asc')
            ->limit(10)
            ->get();

        // 3. Top Diagnoses (Simple Group By on 'diagnosa' string - potentially messy if free text, but good for demo)
        // In a real app, this should be normalized. We'll try to group by the exact string for now.
        $topDiagnoses = RekamMedis::select('diagnosa', DB::raw('count(*) as count'))
            ->groupBy('diagnosa')
            ->orderByDesc('count')
            ->limit(5)
            ->get();

        return Inertia::render('Laporan/Index', [
            'kunjunganStats' => $kunjunganStats,
            'lowStockObats' => $lowStockObats,
            'topDiagnoses' => $topDiagnoses,
        ]);
    }

    public function export()
    {
        $fileName = 'laporan_kunjungan_' . Carbon::today()->format('Y_m_d') . '.csv';
        $endDate = Carbon::today();
        $startDate = Carbon::today()->subDays(6);

        $data = Kunjungan::select(
                DB::raw('DATE(tgl_registrasi) as date'),
                DB::raw('count(*) as count')
            )
            ->whereBetween('tgl_registrasi', [$startDate, $endDate])
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get();

        $headers = [
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=$fileName",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        ];

        $callback = function() use($data) {
            $file = fopen('php://output', 'w');
            fputcsv($file, ['Tanggal', 'Jumlah Kunjungan']);

            foreach ($data as $row) {
                fputcsv($file, [$row->date, $row->count]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
