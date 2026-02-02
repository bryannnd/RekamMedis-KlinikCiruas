import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ tindakan, polikliniks }) {
    const { data, setData, put, processing, errors } = useForm({
        kd_tindakan: tindakan.kd_tindakan,
        nm_tindakan: tindakan.nm_tindakan,
        kd_poli: tindakan.kd_poli || '',
        tarif: tindakan.tarif,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('tindakans.update', tindakan.kd_tindakan));
    };

    return (
        <AuthenticatedLayout header="Edit Tindakan">
            <Head title="Edit Tindakan" />

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <form onSubmit={submit} className="max-w-xl">
                     <div className="space-y-6">
                        <div>
                            <InputLabel htmlFor="kd_tindakan" value="Kode Tindakan" />
                            <TextInput
                                value={data.kd_tindakan}
                                className="mt-1 block w-full bg-gray-100 cursor-not-allowed"
                                disabled
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="nm_tindakan" value="Nama Tindakan" />
                            <TextInput
                                id="nm_tindakan"
                                value={data.nm_tindakan}
                                onChange={(e) => setData('nm_tindakan', e.target.value)}
                                className="mt-1 block w-full"
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
                            Update Data
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
