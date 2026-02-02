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
        Schema::create('polikliniks', function (Blueprint $table) {
            $table->string('kd_poli', 10)->primary();
            $table->string('nm_poli', 100);
            $table->string('lantai', 10)->nullable();
            $table->timestamps();
        });

        Schema::create('obats', function (Blueprint $table) {
            $table->string('kd_obat', 10)->primary();
            $table->string('nm_obat', 100);
            $table->integer('jml_obat')->default(0);
            $table->string('ukuran', 20)->nullable();
            $table->decimal('harga', 10, 2)->default(0);
            $table->timestamps();
        });

        Schema::create('tindakans', function (Blueprint $table) {
            $table->string('kd_tindakan', 10)->primary();
            $table->string('nm_tindakan', 100);
            $table->string('kd_poli', 10)->nullable(); // Optional: if tindakan is specific to a poli
            // Foreign key to poli if needed, but keeping it loose for now or add constraint if strictly required
            // $table->foreign('kd_poli')->references('kd_poli')->on('polikliniks')->onDelete('set null');
            $table->decimal('tarif', 10, 2)->default(0);
            $table->text('ket')->nullable();
            $table->timestamps();
        });

        Schema::create('pasiens', function (Blueprint $table) {
            $table->string('no_pasien', 10)->primary();
            $table->string('nm_pasien', 100);
            $table->enum('jk', ['L', 'P']);
            $table->date('tgl_lhr');
            $table->text('alamat')->nullable();
            $table->string('no_tlp', 20)->nullable();
            $table->string('nm_kk', 100)->nullable(); // Nama Kepala Keluarga
            $table->string('hub_kel', 50)->nullable(); // Hubungan Keluarga
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pasiens');
        Schema::dropIfExists('tindakans');
        Schema::dropIfExists('obats');
        Schema::dropIfExists('polikliniks');
    }
};
