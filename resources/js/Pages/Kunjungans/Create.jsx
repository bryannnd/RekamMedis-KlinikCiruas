import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Create({ pasiens, dokters, polikliniks }) {
    const { data, setData, post, processing, errors } = useForm({
        no_pasien: '',
        kd_dokter: '',
        kd_poli: '',
        tgl_registrasi: new Date().toISOString().split('T')[0],
    });

    const [filteredDokters, setFilteredDokters] = useState(dokters);

    // Simple filtering logic: When Poli selected, filter Dokters
    const handlePoliChange = (e) => {
        const selectedPoli = e.target.value;
        setData('kd_poli', selectedPoli);
        
        if (selectedPoli) {
            setFilteredDokters(dokters.filter(d => d.kd_poli === selectedPoli));
            // Reset dokter if previously selected one is not in this poli
            // but we'll leave it simple for now
            setData(prev => ({ ...prev, kd_poli: selectedPoli, kd_dokter: '' })); 
        } else {
            setFilteredDokters(dokters);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('kunjungans.store'));
    };

    return (
        <AuthenticatedLayout header="Registrasi Kunjungan">
            <Head title="Registrasi Kunjungan" />

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <form onSubmit={submit} className="max-w-xl">
                    <div className="space-y-6">
                        <div>
                            <InputLabel htmlFor="tgl_registrasi" value="Tanggal Registrasi" />
                            <TextInput
                                id="tgl_registrasi"
                                type="date"
                                value={data.tgl_registrasi}
                                onChange={(e) => setData('tgl_registrasi', e.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={errors.tgl_registrasi} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="no_pasien" value="Pasien" />
                            <select
                                id="no_pasien"
                                value={data.no_pasien}
                                onChange={(e) => setData('no_pasien', e.target.value)}
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                required
                            >
                                <option value="">- Pilih Pasien -</option>
                                {pasiens.map((p) => (
                                    <option key={p.no_pasien} value={p.no_pasien}>
                                        {p.no_pasien} - {p.nm_pasien}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.no_pasien} className="mt-2" />
                        </div>

                         <div>
                            <InputLabel htmlFor="kd_poli" value="Poliklinik Tujuan" />
                            <select
                                id="kd_poli"
                                value={data.kd_poli}
                                onChange={handlePoliChange}
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                required
                            >
                                <option value="">- Pilih Poliklinik -</option>
                                {polikliniks.map((p) => (
                                    <option key={p.kd_poli} value={p.kd_poli}>
                                        {p.nm_poli}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.kd_poli} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="kd_dokter" value="Dokter" />
                            <select
                                id="kd_dokter"
                                value={data.kd_dokter}
                                onChange={(e) => setData('kd_dokter', e.target.value)}
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                required
                            >
                                <option value="">- Pilih Dokter -</option>
                                {filteredDokters.map((d) => (
                                    <option key={d.kd_dokter} value={d.kd_dokter}>
                                        {d.nm_dokter} {d.poliklinik ? `(${d.poliklinik.nm_poli})` : ''}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.kd_dokter} className="mt-2" />
                        </div>
                    </div>

                    <div className="flex items-center justify-end mt-8 gap-4">
                        <Link
                            href={route('kunjungans.index')}
                            className="text-gray-600 hover:text-gray-900 font-medium"
                        >
                            Batal
                        </Link>
                        <PrimaryButton disabled={processing}>
                            Registrasi
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
