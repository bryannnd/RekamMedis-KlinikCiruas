import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ laboratorium }) {
    const { data, setData, put, processing, errors } = useForm({
        jenis_pemeriksaan: laboratorium.jenis_pemeriksaan,
        hasil_periksa: laboratorium.hasil_periksa,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('laboratoriums.update', laboratorium.id));
    };

    return (
        <AuthenticatedLayout header="Edit Hasil Laboratorium">
            <Head title="Edit Lab" />

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <form onSubmit={submit} className="max-w-xl">
                    <div className="space-y-6">
                        <div>
                            <InputLabel htmlFor="jenis_pemeriksaan" value="Jenis Pemeriksaan" />
                            <TextInput
                                id="jenis_pemeriksaan"
                                value={data.jenis_pemeriksaan}
                                onChange={(e) => setData('jenis_pemeriksaan', e.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={errors.jenis_pemeriksaan} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="hasil_periksa" value="Hasil Pemeriksaan" />
                            <textarea
                                id="hasil_periksa"
                                value={data.hasil_periksa}
                                onChange={(e) => setData('hasil_periksa', e.target.value)}
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm h-32"
                                required
                            ></textarea>
                            <InputError message={errors.hasil_periksa} className="mt-2" />
                        </div>
                    </div>

                    <div className="flex items-center justify-end mt-8 gap-4">
                        <Link
                            href={route('laboratoriums.index')}
                            className="text-gray-600 hover:text-gray-900 font-medium"
                        >
                            Batal
                        </Link>
                        <PrimaryButton disabled={processing}>
                            Update Hasil
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
