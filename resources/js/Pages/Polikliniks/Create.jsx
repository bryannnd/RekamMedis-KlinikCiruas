import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        // kd_poli: '',
        nm_poli: '',
        lantai: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('polikliniks.store'));
    };

    return (
        <AuthenticatedLayout header="Tambah Poliklinik">
            <Head title="Tambah Poliklinik" />

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <form onSubmit={submit} className="max-w-xl">
                    <div className="space-y-6">
                        
                        <div className="p-3 bg-blue-50 text-blue-700 rounded-lg text-sm mb-4">
                            ℹ️ Kode Poliklinik akan dibuat secara otomatis (P00X).
                        </div>

                        <div>
                            <InputLabel htmlFor="nm_poli" value="Nama Poliklinik" />
                            <TextInput
                                id="nm_poli"
                                value={data.nm_poli}
                                onChange={(e) => setData('nm_poli', e.target.value)}
                                className="mt-1 block w-full"
                                placeholder="Poli Umum"
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
                                placeholder="1"
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
                            Simpan Data
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
