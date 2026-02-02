<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RekamMedis extends Model
{
    use HasFactory;

    protected $table = 'rekam_medis'; // Explicit table name because singular 'rekam_medis'
    protected $primaryKey = 'no_rawat';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $guarded = [];

    protected $casts = [
        'tindakan' => 'array',
        'resep_obat' => 'array',
    ];

    // Relationships
    public function kunjungan()
    {
        return $this->belongsTo(Kunjungan::class, 'no_rawat', 'no_rawat');
    }

    public function dokter()
    {
        return $this->belongsTo(Dokter::class, 'kd_dokter', 'kd_dokter');
    }

    public function pasien()
    {
        // Through Kunjungan is better but we also stored no_pasien directly in migration
       return $this->belongsTo(Pasien::class, 'no_pasien', 'no_pasien');
    }
}
