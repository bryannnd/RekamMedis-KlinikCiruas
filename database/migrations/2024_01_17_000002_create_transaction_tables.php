<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('dokters', function (Blueprint $table) {
            $table->string('kd_dokter', 10)->primary();
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('cascade');
            $table->string('kd_poli', 10)->nullable();
            $table->foreign('kd_poli')->references('kd_poli')->on('polikliniks')->onDelete('SET NULL');
            $table->string('nm_dokter');
            $table->string('SIP', 50)->nullable();
            $table->string('tempat_lhr', 100)->nullable();
            $table->string('no_tlp', 20)->nullable();
            $table->text('alamat')->nullable();
            $table->timestamps();
        });

        Schema::create('kunjungans', function (Blueprint $table) {
            $table->string('no_rawat', 20)->primary();
            $table->string('no_pasien', 10);
            $table->foreign('no_pasien')->references('no_pasien')->on('pasiens')->onDelete('cascade');
            $table->string('kd_dokter', 10)->nullable();
            $table->foreign('kd_dokter')->references('kd_dokter')->on('dokters')->onDelete('SET NULL');
            $table->string('kd_poli', 10)->nullable();
            $table->foreign('kd_poli')->references('kd_poli')->on('polikliniks')->onDelete('SET NULL');
            $table->date('tgl_registrasi');
            $table->time('jam_registrasi');
            $table->enum('status_periksa', ['Belum', 'Sudah', 'Batal'])->default('Belum');
            $table->timestamps();
        });

        Schema::create('rekam_medis', function (Blueprint $table) {
            $table->string('no_rawat', 20)->primary();
            $table->foreign('no_rawat')->references('no_rawat')->on('kunjungans')->onDelete('cascade');
            $table->string('no_pasien', 10);
            $table->string('kd_dokter', 10)->nullable();
            $table->text('keluhan')->nullable(); // Anamnesa
            $table->text('diagnosa')->nullable();
            $table->text('tindakan')->nullable(); // Could be JSON or separate table, keeping simple for now
            $table->text('resep_obat')->nullable(); // Could be JSON
            $table->timestamps();
        });

        Schema::create('laboratoriums', function (Blueprint $table) {
            $table->id();
            $table->string('no_rawat', 20);
            $table->foreign('no_rawat')->references('no_rawat')->on('rekam_medis')->onDelete('cascade');
            $table->string('jenis_pemeriksaan');
            $table->text('hasil_periksa');
            $table->date('tgl_periksa');
            $table->time('jam_periksa');
            $table->string('kd_petugas')->nullable(); // Linking to user or separate petugas table
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('laboratoriums');
        Schema::dropIfExists('rekam_medis');
        Schema::dropIfExists('kunjungans');
        Schema::dropIfExists('dokters');
    }
};
