import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        // no_pasien: '', // Removed from state
        nm_pasien: '',
        jk: 'L',
        tgl_lhr: '',
        alamat: '',
        no_tlp: '',
        nm_kk: '',
        hub_kel: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('pasiens.store'));
    };

    return (
        <AuthenticatedLayout header="Tambah Pasien Baru">
            <Head title="Tambah Pasien" />

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <form onSubmit={submit} className="max-w-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                       {/* No Pasien Input Removed - Auto Generated */}
                       <div className="md:col-span-2 p-3 bg-blue-50 text-blue-700 rounded-lg text-sm mb-2">
                           ℹ️ Nomor Pasien akan dibuat secara otomatis oleh sistem (PS-XXXX).
                       </div>

                        <div>
                            <InputLabel htmlFor="nm_pasien" value="Nama Lengkap" />
                            <TextInput
                                id="nm_pasien"
                                value={data.nm_pasien}
                                onChange={(e) => setData('nm_pasien', e.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={errors.nm_pasien} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="jk" value="Jenis Kelamin" />
                            <select
                                id="jk"
                                value={data.jk}
                                onChange={(e) => setData('jk', e.target.value)}
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            >
                                <option value="L">Laki-laki</option>
                                <option value="P">Perempuan</option>
                            </select>
                            <InputError message={errors.jk} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="tgl_lhr" value="Tanggal Lahir" />
                            <TextInput
                                id="tgl_lhr"
                                type="date"
                                value={data.tgl_lhr}
                                onChange={(e) => setData('tgl_lhr', e.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={errors.tgl_lhr} className="mt-2" />
                        </div>

                        <div className="md:col-span-2">
                            <InputLabel htmlFor="alamat" value="Alamat" />
                            <TextInput
                                id="alamat"
                                value={data.alamat}
                                onChange={(e) => setData('alamat', e.target.value)}
                                className="mt-1 block w-full"
                            />
                            <InputError message={errors.alamat} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="no_tlp" value="No Telepon" />
                            <TextInput
                                id="no_tlp"
                                value={data.no_tlp}
                                onChange={(e) => setData('no_tlp', e.target.value)}
                                className="mt-1 block w-full"
                            />
                            <InputError message={errors.no_tlp} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="nm_kk" value="Nama Kepala Keluarga" />
                            <TextInput
                                id="nm_kk"
                                value={data.nm_kk}
                                onChange={(e) => setData('nm_kk', e.target.value)}
                                className="mt-1 block w-full"
                            />
                            <InputError message={errors.nm_kk} className="mt-2" />
                        </div>
                    </div>

                    <div className="flex items-center justify-end mt-8 gap-4">
                        <Link
                            href={route('pasiens.index')}
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
