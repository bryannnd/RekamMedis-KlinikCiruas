import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ polikliniks }) {
    const { data, setData, post, processing, errors } = useForm({
        // kd_dokter: '', // Auto
        nm_dokter: '',
        kd_poli: '',
        sip: '',
        tempat_lhr: '',
        no_tlp: '',
        alamat: '',
        username: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('dokters.store'));
    };

    return (
        <AuthenticatedLayout header="Tambah Dokter">
            <Head title="Tambah Dokter" />

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <form onSubmit={submit} className="max-w-4xl">
                    <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Informasi Pribadi & Profesional</h3>
                    
                    <div className="md:col-span-2 p-3 bg-blue-50 text-blue-700 rounded-lg text-sm mb-4">
                        ℹ️ Kode Dokter akan dibuat secara otomatis (D00X).
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                            <InputLabel htmlFor="nm_dokter" value="Nama Dokter" />
                            <TextInput
                                id="nm_dokter"
                                value={data.nm_dokter}
                                onChange={(e) => setData('nm_dokter', e.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={errors.nm_dokter} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="kd_poli" value="Poliklinik" />
                            <select
                                id="kd_poli"
                                value={data.kd_poli}
                                onChange={(e) => setData('kd_poli', e.target.value)}
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                required
                            >
                                <option value="">Pilih Poliklinik</option>
                                {polikliniks.map((poli) => (
                                    <option key={poli.kd_poli} value={poli.kd_poli}>
                                        {poli.nm_poli}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.kd_poli} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="sip" value="No. SIP" />
                            <TextInput
                                id="sip"
                                value={data.sip}
                                onChange={(e) => setData('sip', e.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={errors.sip} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="tempat_lhr" value="Tempat Lahir" />
                            <TextInput
                                id="tempat_lhr"
                                value={data.tempat_lhr}
                                onChange={(e) => setData('tempat_lhr', e.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={errors.tempat_lhr} className="mt-2" />
                        </div>

                         <div>
                            <InputLabel htmlFor="no_tlp" value="No Telepon" />
                            <TextInput
                                id="no_tlp"
                                value={data.no_tlp}
                                onChange={(e) => setData('no_tlp', e.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={errors.no_tlp} className="mt-2" />
                        </div>

                        <div className="md:col-span-2">
                             <InputLabel htmlFor="alamat" value="Alamat" />
                            <textarea
                                id="alamat"
                                value={data.alamat}
                                onChange={(e) => setData('alamat', e.target.value)}
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                rows="3"
                                required
                            ></textarea>
                            <InputError message={errors.alamat} className="mt-2" />
                        </div>
                    </div>

                    <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Akun Login</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <InputLabel htmlFor="username" value="Username" />
                            <TextInput
                                id="username"
                                value={data.username}
                                onChange={(e) => setData('username', e.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={errors.username} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="password" value="Password" />
                             <TextInput
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>
                    </div>

                    <div className="flex items-center justify-end mt-8 gap-4">
                        <Link
                            href={route('dokters.index')}
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
