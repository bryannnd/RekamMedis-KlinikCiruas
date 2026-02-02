<?php

namespace App\Http\Controllers;

use App\Models\Dokter;
use App\Models\Poliklinik;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class DokterController extends Controller
{
    public function index()
    {
        $dokters = Dokter::query()
            ->with(['poliklinik', 'user'])
            ->when(request('search'), function ($query, $search) {
                $query->where('nm_dokter', 'like', "%{$search}%")
                      ->orWhere('kd_dokter', 'like', "%{$search}%");
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Dokters/Index', [
            'dokters' => $dokters,
            'filters' => request()->all(['search']),
        ]);
    }

    public function create()
    {
        $polikliniks = Poliklinik::all();
        
        return Inertia::render('Dokters/Create', [
            'polikliniks' => $polikliniks
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            // 'kd_dokter' => 'required|unique:dokters|max:10', // Auto-generated
            'nm_dokter' => 'required|string|max:255',
            'kd_poli' => 'required|exists:polikliniks,kd_poli',
            'sip' => 'required|string|max:50',
            'tempat_lhr' => 'required|string|max:100',
            'no_tlp' => 'required|string|max:20',
            'alamat' => 'required|string',
            'username' => 'required|string|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        DB::transaction(function () use ($validated) {
            // Auto Generate Code: D001, D002...
            $last = Dokter::orderBy('kd_dokter', 'desc')->first();
            if ($last) {
                 // Assumes Dxxx format
                 $num = intval(substr($last->kd_dokter, 1));
                 $newCode = 'D' . str_pad($num + 1, 3, '0', STR_PAD_LEFT);
            } else {
                 $newCode = 'D001';
            }

            // 1. Create User
            $user = User::create([
                'name' => $validated['nm_dokter'],
                'username' => $validated['username'],
                'email' => $validated['username'] . '@hospital.com',
                'role' => 'dokter',
                'password' => Hash::make($validated['password']),
            ]);

            // 2. Create Dokter
            Dokter::create([
                'kd_dokter' => $newCode,
                'user_id' => $user->id,
                'kd_poli' => $validated['kd_poli'],
                'nm_dokter' => $validated['nm_dokter'],
                'SIP' => $validated['sip'],
                'tempat_lhr' => $validated['tempat_lhr'],
                'no_tlp' => $validated['no_tlp'],
                'alamat' => $validated['alamat'],
            ]);
        });

        return redirect()->route('dokters.index')->with('success', 'Dokter berhasil ditambahkan.');
    }

    public function edit(Dokter $dokter)
    {
        return Inertia::render('Dokters/Edit', [
            'dokter' => $dokter->load('user'),
            'polikliniks' => Poliklinik::all()
        ]);
    }

    public function update(Request $request, Dokter $dokter)
    {
        $validated = $request->validate([
            'nm_dokter' => 'required|string|max:255',
            'kd_poli' => 'required|exists:polikliniks,kd_poli',
            'sip' => 'required|string|max:50',
            'tempat_lhr' => 'required|string|max:100',
            'no_tlp' => 'required|string|max:20',
            'alamat' => 'required|string',
        ]);

        if ($dokter->nm_dokter !== $validated['nm_dokter']) {
            $dokter->user->update(['name' => $validated['nm_dokter']]);
        }

        $dokter->update([
             'kd_poli' => $validated['kd_poli'],
             'nm_dokter' => $validated['nm_dokter'],
             'SIP' => $validated['sip'],
             'tempat_lhr' => $validated['tempat_lhr'],
             'no_tlp' => $validated['no_tlp'],
             'alamat' => $validated['alamat'],
        ]);

        return redirect()->route('dokters.index')->with('success', 'Data dokter berhasil diperbarui.');
    }

    public function destroy(Dokter $dokter)
    {
        $user = $dokter->user;
        $dokter->delete();
        if ($user) {
             $user->delete();
        }

        return redirect()->route('dokters.index')->with('success', 'Data dokter berhasil dihapus.');
    }
}
