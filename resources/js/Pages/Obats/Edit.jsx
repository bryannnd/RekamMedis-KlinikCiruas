import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ obat }) {
    const { data, setData, put, processing, errors } = useForm({
        kd_obat: obat.kd_obat,
        nm_obat: obat.nm_obat,
        jml_obat: obat.jml_obat,
        ukuran: obat.ukuran,
        harga: obat.harga,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('obats.update', obat.kd_obat));
    };

    return (
        <AuthenticatedLayout header="Edit Obat">
            <Head title="Edit Obat" />

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <form onSubmit={submit} className="max-w-xl">
                     <div className="space-y-6">
                        <div>
                            <InputLabel htmlFor="kd_obat" value="Kode Obat" />
                            <TextInput
                                value={data.kd_obat}
                                className="mt-1 block w-full bg-gray-100 cursor-not-allowed"
                                disabled
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="nm_obat" value="Nama Obat" />
                            <TextInput
                                id="nm_obat"
                                value={data.nm_obat}
                                onChange={(e) => setData('nm_obat', e.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={errors.nm_obat} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="jml_obat" value="Jumlah Stock" />
                            <TextInput
                                id="jml_obat"
                                type="number"
                                value={data.jml_obat}
                                onChange={(e) => setData('jml_obat', e.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={errors.jml_obat} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="ukuran" value="Ukuran/Satuan" />
                            <TextInput
                                id="ukuran"
                                value={data.ukuran}
                                onChange={(e) => setData('ukuran', e.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={errors.ukuran} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="harga" value="Harga" />
                            <TextInput
                                id="harga"
                                type="number"
                                value={data.harga}
                                onChange={(e) => setData('harga', e.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={errors.harga} className="mt-2" />
                        </div>
                    </div>

                    <div className="flex items-center justify-end mt-8 gap-4">
                        <Link
                            href={route('obats.index')}
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
