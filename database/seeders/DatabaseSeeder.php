<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Poliklinik;
use App\Models\Obat;
use App\Models\Tindakan;
use App\Models\Dokter;
use App\Models\Pasien;
use App\Models\Kunjungan;
use App\Models\RekamMedis;
use App\Models\Laboratorium;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create Users for each Role
        User::factory()->create([
            'name' => 'Administrator',
            'username' => 'admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('admin'),
            'role' => 'admin',
        ]);

        User::factory()->create([
            'name' => 'Petugas Pendaftaran',
            'username' => 'petugas',
            'email' => 'petugas@example.com',
            'password' => Hash::make('petugas'),
            'role' => 'petugas',
        ]);

        User::factory()->create([
            'name' => 'Manajer Klinik',
            'username' => 'manajer',
            'email' => 'manajer@example.com',
            'password' => Hash::make('manajer'),
            'role' => 'manajer',
        ]);

        // 2. Master Poliklinik
        $poliUmum = Poliklinik::create(['kd_poli' => 'P001', 'nm_poli' => 'Poli Umum', 'lantai' => '1']);
        $poliGigi = Poliklinik::create(['kd_poli' => 'P002', 'nm_poli' => 'Poli Gigi', 'lantai' => '2']);
        $poliKia = Poliklinik::create(['kd_poli' => 'P003', 'nm_poli' => 'Poli Kia', 'lantai' => '1']);
        $poliAnak = Poliklinik::create(['kd_poli' => 'P004', 'nm_poli' => 'Poli Anak', 'lantai' => '2']);
        $poliMata = Poliklinik::create(['kd_poli' => 'P005', 'nm_poli' => 'Poli Mata', 'lantai' => '3']);
        $poliTht = Poliklinik::create(['kd_poli' => 'P006', 'nm_poli' => 'Poli THT', 'lantai' => '3']);

        // 3. Master Dokter (and their Users)
        
        // Dokter 1 - Poli Umum
        $dokterUser1 = User::create([
            'name' => 'Dr. Budi Santoso',
            'username' => 'dr.budi',
            'email' => 'budidr@example.com', 
            'password' => Hash::make('dr.budi'),
            'role' => 'dokter'
        ]);
        
        $dokter1 = Dokter::create([
            'kd_dokter' => 'D001',
            'user_id' => $dokterUser1->id,
            'kd_poli' => $poliUmum->kd_poli,
            'nm_dokter' => 'Dr. Budi Santoso',
            'sip' => '123/SIP/2024',
            'no_tlp' => '08123456789',
            'alamat' => 'Jl. Madyopuro No. 5',
            'tempat_lhr' => 'Malang'
        ]);

        // Dokter 2 - Poli Gigi
        $dokterUser2 = User::create([
            'name' => 'Drg. Siti Aisyah',
            'username' => 'dr.siti',
            'email' => 'sitidr@example.com',
            'password' => Hash::make('dr.siti'),
            'role' => 'dokter'
        ]);

        $dokter2 = Dokter::create([
            'kd_dokter' => 'D002',
            'user_id' => $dokterUser2->id,
            'kd_poli' => $poliGigi->kd_poli,
            'nm_dokter' => 'Drg. Siti Aisyah',
            'sip' => '456/SIP/2024',
            'no_tlp' => '08987654321',
            'alamat' => 'Jl. Sawojajar No. 10',
            'tempat_lhr' => 'Surabaya'
        ]);

        // Dokter 3 - Poli Anak
        $dokterUser3 = User::create([
            'name' => 'Dr. Setiawan',
            'username' => 'dr.setiawan',
            'email' => 'setiawandr@example.com',
            'password' => Hash::make('dr.setiawan'),
            'role' => 'dokter'
        ]);

        Dokter::create([
            'kd_dokter' => 'D003',
            'user_id' => $dokterUser3->id,
            'kd_poli' => $poliAnak->kd_poli,
            'nm_dokter' => 'Dr. Setiawan',
            'sip' => '789/SIP/2024',
            'no_tlp' => '081233334444',
            'alamat' => 'Jl. Ijen No. 20',
            'tempat_lhr' => 'Jakarta'
        ]);

        // Dokter 4 - Poli Mata
        $dokterUser4 = User::create([
            'name' => 'Dr. Rina',
            'username' => 'dr.rina',
            'email' => 'rinadr@example.com',
            'password' => Hash::make('dr.rina'),
            'role' => 'dokter'
        ]);

        Dokter::create([
            'kd_dokter' => 'D004',
            'user_id' => $dokterUser4->id,
            'kd_poli' => $poliMata->kd_poli,
            'nm_dokter' => 'Dr. Rina',
            'sip' => '101/SIP/2024',
            'no_tlp' => '081255556666',
            'alamat' => 'Jl. Kawi No. 15',
            'tempat_lhr' => 'Bandung'
        ]);

        // Dokter 5 - Poli THT
        $dokterUser5 = User::create([
            'name' => 'Dr. Tono',
            'username' => 'dr.tono',
            'email' => 'tonodr@example.com',
            'password' => Hash::make('dr.tono'),
            'role' => 'dokter'
        ]);

        Dokter::create([
            'kd_dokter' => 'D005',
            'user_id' => $dokterUser5->id,
            'kd_poli' => $poliTht->kd_poli,
            'nm_dokter' => 'Dr. Tono',
            'sip' => '202/SIP/2024',
            'no_tlp' => '081277778888',
            'alamat' => 'Jl. Argopuro No. 8',
            'tempat_lhr' => 'Yogyakarta'
        ]);


        // 4. Master Obat
        Obat::create(['kd_obat' => 'O001', 'nm_obat' => 'Paracetamol 500mg', 'jml_obat' => 100, 'ukuran' => 'Strip', 'harga' => 5000]);
        Obat::create(['kd_obat' => 'O002', 'nm_obat' => 'Amoxicillin 500mg', 'jml_obat' => 50, 'ukuran' => 'Strip', 'harga' => 12000]);
        Obat::create(['kd_obat' => 'O003', 'nm_obat' => 'Vitamin C', 'jml_obat' => 200, 'ukuran' => 'Botol', 'harga' => 15000]);
        Obat::create(['kd_obat' => 'O004', 'nm_obat' => 'Betadine Cair', 'jml_obat' => 20, 'ukuran' => 'Botol', 'harga' => 25000]);
        Obat::create(['kd_obat' => 'O005', 'nm_obat' => 'OBH Sirup', 'jml_obat' => 30, 'ukuran' => 'Botol', 'harga' => 18000]);
        Obat::create(['kd_obat' => 'O006', 'nm_obat' => 'Insto Tetes Mata', 'jml_obat' => 45, 'ukuran' => 'Botol', 'harga' => 13500]);
        Obat::create(['kd_obat' => 'O007', 'nm_obat' => 'Salep Kulit 88', 'jml_obat' => 25, 'ukuran' => 'Tube', 'harga' => 9000]);
        Obat::create(['kd_obat' => 'O008', 'nm_obat' => 'Vitamin Anak', 'jml_obat' => 60, 'ukuran' => 'Botol', 'harga' => 25000]);
        Obat::create(['kd_obat' => 'O009', 'nm_obat' => 'Cefadroxil 500mg', 'jml_obat' => 100, 'ukuran' => 'Strip', 'harga' => 14000]);
        Obat::create(['kd_obat' => 'O010', 'nm_obat' => 'Asam Mefenamat', 'jml_obat' => 150, 'ukuran' => 'Strip', 'harga' => 6000]);

        // 5. Master Tindakan
        Tindakan::create(['kd_tindakan' => 'T001', 'nm_tindakan' => 'Pemeriksaan Umum', 'kd_poli' => 'P001', 'tarif' => 30000]);
        Tindakan::create(['kd_tindakan' => 'T002', 'nm_tindakan' => 'Cabut Gigi Dewasa', 'kd_poli' => 'P002', 'tarif' => 150000]);
        Tindakan::create(['kd_tindakan' => 'T003', 'nm_tindakan' => 'Scaling Gigi', 'kd_poli' => 'P002', 'tarif' => 100000]);
        Tindakan::create(['kd_tindakan' => 'T004', 'nm_tindakan' => 'Suntik Vitamin', 'kd_poli' => null, 'tarif' => 50000]); 
        Tindakan::create(['kd_tindakan' => 'T005', 'nm_tindakan' => 'Imunisasi Dasar', 'kd_poli' => 'P004', 'tarif' => 45000]); 
        Tindakan::create(['kd_tindakan' => 'T006', 'nm_tindakan' => 'Nebulizer', 'kd_poli' => 'P004', 'tarif' => 75000]); 
        Tindakan::create(['kd_tindakan' => 'T007', 'nm_tindakan' => 'Pemeriksaan Mata', 'kd_poli' => 'P005', 'tarif' => 50000]); 
        Tindakan::create(['kd_tindakan' => 'T008', 'nm_tindakan' => 'Irigasi Telinga', 'kd_poli' => 'P006', 'tarif' => 60000]); 
        Tindakan::create(['kd_tindakan' => 'T009', 'nm_tindakan' => 'Jahit Luka Ringan', 'kd_poli' => 'P001', 'tarif' => 80000]); 

        // 6. Dummy Pasiens
        $pasien1 = Pasien::create([
            'no_pasien' => 'PS-0001',
            'nm_pasien' => 'Ahmad Dahlan',
            'jk' => 'L',
            'tgl_lhr' => '1980-05-12',
            'alamat' => 'Jl. Merdeka No. 10',
            'no_tlp' => '081234455',
        ]);
        
        $pasien2 = Pasien::create([
            'no_pasien' => 'PS-0002',
            'nm_pasien' => 'Siti Aminah',
            'jk' => 'P',
            'tgl_lhr' => '1995-08-17',
            'alamat' => 'Jl. Sudirman No. 5',
            'no_tlp' => '085678899',
        ]);

        $pasien3 = Pasien::create([
            'no_pasien' => 'PS-0003',
            'nm_pasien' => 'Rudi Hartono',
            'jk' => 'L',
            'tgl_lhr' => '1990-01-01',
            'alamat' => 'Jl. Diponegoro No. 8',
            'no_tlp' => '0812999888',
        ]);

        // 7. Dummy Kunjungan & Rekam Medis (Transactions)
        $today = Carbon::today()->format('Y-m-d');
        $prefix = Carbon::today()->format('Y/m/d/');

        // Kunjungan 1: Sudah Periksa (Poli Umum)
        $kunjungan1 = Kunjungan::create([
            'no_rawat' => $prefix . '0001',
            'no_pasien' => $pasien1->no_pasien,
            'kd_dokter' => $dokter1->kd_dokter,
            'kd_poli' => $poliUmum->kd_poli,
            'tgl_registrasi' => $today,
            'jam_registrasi' => '08:00:00',
            'status_periksa' => 'Sudah',
        ]);

        RekamMedis::create([
            'no_rawat' => $kunjungan1->no_rawat,
            'no_pasien' => $pasien1->no_pasien,
            'kd_dokter' => $dokter1->kd_dokter,
            'keluhan' => 'Demam tinggi 3 hari',
            'diagnosa' => 'Febris observation',
            'tindakan' => [['kd_tindakan' => 'T001', 'nm_tindakan' => 'Pemeriksaan Umum', 'harga' => 30000]],
            'resep_obat' => [['kd_obat' => 'O001', 'nm_obat' => 'Paracetamol', 'jumlah' => 10, 'harga' => 5000]],
        ]);

        Laboratorium::create([
            'no_rawat' => $kunjungan1->no_rawat,
            'jenis_pemeriksaan' => 'Cek Darah Lengkap',
            'hasil_periksa' => 'Hb: 14, Leukosit: 12.000 (Tinggi)',
            'tgl_periksa' => $today,
            'jam_periksa' => '08:30:00',
            'kd_petugas' => 'petugas', // Simple string for now
        ]);

        // Kunjungan 2: Sudah Periksa (Poli Gigi - No Lab)
        $kunjungan2 = Kunjungan::create([
            'no_rawat' => $prefix . '0002',
            'no_pasien' => $pasien2->no_pasien,
            'kd_dokter' => $dokter2->kd_dokter,
            'kd_poli' => $poliGigi->kd_poli,
            'tgl_registrasi' => $today,
            'jam_registrasi' => '09:00:00',
            'status_periksa' => 'Sudah',
        ]);

        RekamMedis::create([
            'no_rawat' => $kunjungan2->no_rawat,
            'no_pasien' => $pasien2->no_pasien,
            'kd_dokter' => $dokter2->kd_dokter,
            'keluhan' => 'Sakit gigi geraham bawah',
            'diagnosa' => 'Pulpitis',
            'tindakan' => [['kd_tindakan' => 'T002', 'nm_tindakan' => 'Cabut Gigi Dewasa', 'harga' => 150000]],
            'resep_obat' => [['kd_obat' => 'O002', 'nm_obat' => 'Amoxicillin', 'jumlah' => 10, 'harga' => 12000]],
        ]);

        // Kunjungan 3: Belum Periksa (Queue)
        Kunjungan::create([
            'no_rawat' => $prefix . '0003',
            'no_pasien' => $pasien3->no_pasien,
            'kd_dokter' => $dokter1->kd_dokter,
            'kd_poli' => $poliUmum->kd_poli,
            'tgl_registrasi' => $today,
            'jam_registrasi' => '10:00:00',
            'status_periksa' => 'Belum',
        ]);
    }
}
