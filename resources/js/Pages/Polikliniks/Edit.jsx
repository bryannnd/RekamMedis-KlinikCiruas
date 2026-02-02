import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ poliklinik }) {
    const { data, setData, put, processing, errors } = useForm({
        kd_poli: poliklinik.kd_poli,
        nm_poli: poliklinik.nm_poli,
        lantai: poliklinik.lantai,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('polikliniks.update', poliklinik.kd_poli));
    };

    return (
        <AuthenticatedLayout header="Edit Poliklinik">
            <Head title="Edit Poliklinik" />

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <form onSubmit={submit} className="max-w-xl">
                    <div className="space-y-6">
                        <div>
                            <InputLabel htmlFor="kd_poli" value="Kode Poli" />
                            <TextInput
                                id="kd_poli"
                                value={data.kd_poli}
                                className="mt-1 block w-full bg-gray-100 cursor-not-allowed"
                                disabled
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="nm_poli" value="Nama Poliklinik" />
                            <TextInput
                                id="nm_poli"
                                value={data.nm_poli}
                                onChange={(e) => setData('nm_poli', e.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={errors.nm_poli} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="lantai" value="Lantai" />
                            <TextInput
                                id="lantai"
                                value={data.lantai}
                                onChange={(e) => setData('lantai', e.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={errors.lantai} className="mt-2" />
                        </div>
                    </div>

                    <div className="flex items-center justify-end mt-8 gap-4">
                        <Link
                            href={route('polikliniks.index')}
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
