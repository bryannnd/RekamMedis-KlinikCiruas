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

        // 4. Kunjungan History (Last 30 Days - Pagination)
        // Matching the export logic context
        $historyEndDate = Carbon::today()->endOfDay();
        $historyStartDate = Carbon::today()->subDays(30)->startOfDay();

        $kunjunganHistory = Kunjungan::with(['pasien', 'dokter', 'poliklinik'])
            ->whereBetween('tgl_registrasi', [$historyStartDate, $historyEndDate])
            ->orderBy('tgl_registrasi', 'desc')
            ->orderBy('jam_registrasi', 'desc')
            ->paginate(10);

        return Inertia::render('Laporan/Index', [
            'kunjunganStats' => $kunjunganStats,
            'lowStockObats' => $lowStockObats,
            'topDiagnoses' => $topDiagnoses,
            'kunjunganHistory' => $kunjunganHistory,
        ]);
    }

    public function export()
    {
        $fileName = 'laporan_kunjungan_detail_' . Carbon::today()->format('Y_m_d') . '.csv';
        // Export data for the last 30 days by default for a more complete report
        $endDate = Carbon::today()->endOfDay();
        $startDate = Carbon::today()->subDays(30)->startOfDay();

        $data = Kunjungan::with(['pasien', 'dokter', 'poliklinik'])
            ->whereBetween('tgl_registrasi', [$startDate, $endDate])
            ->orderBy('tgl_registrasi', 'desc')
            ->orderBy('jam_registrasi', 'desc')
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
            
            // Add BOM for Excel UTF-8 compatibility
            fputs($file, "\xEF\xBB\xBF");

            // CSV Header
            fputcsv($file, [
                'No. Rawat', 
                'Tanggal Registrasi', 
                'Jam', 
                'No. Rekam Medis', 
                'Nama Pasien', 
                'Jenis Kelamin', 
                'Alamat', 
                'Poliklinik Tujuan', 
                'Dokter PJ'
            ], ';');

            foreach ($data as $row) {
                fputcsv($file, [
                    $row->no_rawat,
                    $row->tgl_registrasi,
                    $row->jam_registrasi,
                    $row->no_pasien, // Assuming FK exists
                    $row->pasien ? $row->pasien->nm_pasien : '-',
                    $row->pasien ? ($row->pasien->jk === 'L' ? 'Laki-laki' : 'Perempuan') : '-',
                    $row->pasien ? $row->pasien->alamat : '-',
                    $row->poliklinik ? $row->poliklinik->nm_poli : '-',
                    $row->dokter ? $row->dokter->nm_dokter : '-'
                ], ';');
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
