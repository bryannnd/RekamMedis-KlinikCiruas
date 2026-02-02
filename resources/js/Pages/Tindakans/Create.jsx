import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ polikliniks }) {
    const { data, setData, post, processing, errors } = useForm({
        // kd_tindakan: '',
        nm_tindakan: '',
        kd_poli: '',
        tarif: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('tindakans.store'));
    };

    return (
        <AuthenticatedLayout header="Tambah Tindakan">
            <Head title="Tambah Tindakan" />

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <form onSubmit={submit} className="max-w-xl">
                    <div className="space-y-6">
                        
                         <div className="p-3 bg-blue-50 text-blue-700 rounded-lg text-sm mb-4">
                            ℹ️ Kode Tindakan akan dibuat secara otomatis (T00X).
                        </div>

                        <div>
                            <InputLabel htmlFor="nm_tindakan" value="Nama Tindakan" />
                            <TextInput
                                id="nm_tindakan"
                                value={data.nm_tindakan}
                                onChange={(e) => setData('nm_tindakan', e.target.value)}
                                className="mt-1 block w-full"
                                placeholder="Pemeriksaan Umum"
                                required
                            />
                            <InputError message={errors.nm_tindakan} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="kd_poli" value="Poliklinik (Opsional)" />
                            <select
                                id="kd_poli"
                                value={data.kd_poli}
                                onChange={(e) => setData('kd_poli', e.target.value)}
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            >
                                <option value="">- Umum / Semua Poli -</option>
                                {polikliniks.map((poli) => (
                                    <option key={poli.kd_poli} value={poli.kd_poli}>
                                        {poli.nm_poli}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.kd_poli} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="tarif" value="Tarif" />
                            <TextInput
                                id="tarif"
                                type="number"
                                value={data.tarif}
                                onChange={(e) => setData('tarif', e.target.value)}
                                className="mt-1 block w-full"
                                placeholder="50000"
                                required
                            />
                            <InputError message={errors.tarif} className="mt-2" />
                        </div>
                    </div>

                    <div className="flex items-center justify-end mt-8 gap-4">
                        <Link
                            href={route('tindakans.index')}
                            className="text-gray-600 hover:text-gray-900 font-medium"
                        >
                            Batal
                        </Link>
                        <PrimaryButton disabled={processing}>
                            Simpan Data
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
