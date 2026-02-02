<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Poliklinik extends Model
{
    use HasFactory;

    protected $primaryKey = 'kd_poli';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $guarded = [];
}
