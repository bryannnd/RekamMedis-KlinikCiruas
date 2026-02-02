<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pasien extends Model
{
    use HasFactory;

    protected $primaryKey = 'no_pasien';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $guarded = [];

    protected $appends = ['umur'];

    // Accessors
    public function getUmurAttribute()
    {
        return \Carbon\Carbon::parse($this->tgl_lhr)->age;
    }

    // Relationships can be added here if needed, e.g. visits
    public function kunjungans()
    {
        return $this->hasMany(Kunjungan::class, 'no_pasien', 'no_pasien');
    }
}
