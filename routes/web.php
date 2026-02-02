<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\UserController;
use App\Http\Controllers\DokterController;
use App\Http\Controllers\PoliklinikController;
use App\Http\Controllers\ObatController;
use App\Http\Controllers\TindakanController;
use App\Http\Controllers\PasienController;
use App\Http\Controllers\KunjunganController;
use App\Http\Controllers\RekamMedisController;
use App\Http\Controllers\LaboratoriumController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\AntrianController;
use App\Http\Controllers\DashboardController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'role:admin,dokter,petugas,manajer'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('users', UserController::class);
    Route::resource('dokters', DokterController::class);
    Route::resource('polikliniks', PoliklinikController::class);
    Route::resource('obats', ObatController::class);
    Route::resource('tindakans', TindakanController::class);
    Route::resource('pasiens', PasienController::class);
    Route::resource('kunjungans', KunjunganController::class);
    Route::resource('rekam_medis', RekamMedisController::class)->except(['show']);

    // Explicit route for rekam_medis.show to handle slashes in ID (e.g. 2026/02/02/0001)
    Route::get('rekam_medis/{rekam_medis}', [RekamMedisController::class, 'show'])
        ->where('rekam_medis', '.*')
        ->name('rekam_medis.show');
    Route::resource('laboratoriums', LaboratoriumController::class);
    
    Route::get('antrian', [AntrianController::class, 'index'])->name('antrian.index');
    Route::get('laporan/export', [LaporanController::class, 'export'])->name('laporan.export');
    Route::get('laporan', [LaporanController::class, 'index'])->name('laporan.index');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';