import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ rekamMedis }) {
    const { data, setData, post, processing, errors } = useForm({
        no_rawat: '',
        jenis_pemeriksaan: '',
        hasil_periksa: '',
        tgl_periksa: new Date().toISOString().split('T')[0],
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('laboratoriums.store'));
    };

    return (
        <AuthenticatedLayout header="Input Hasil Laboratorium">
            <Head title="Input Lab" />

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <form onSubmit={submit} className="max-w-xl">
                    <div className="space-y-6">
                        <div>
                            <InputLabel htmlFor="tgl_periksa" value="Tanggal Periksa" />
                            <TextInput
                                id="tgl_periksa"
                                type="date"
                                value={data.tgl_periksa}
                                onChange={(e) => setData('tgl_periksa', e.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={errors.tgl_periksa} className="mt-2" />
                        </div>

                         <div>
                            <InputLabel htmlFor="no_rawat" value="Pilih Pasien / Kunjungan" />
                            <select
                                id="no_rawat"
                                value={data.no_rawat}
                                onChange={(e) => setData('no_rawat', e.target.value)}
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                required
                            >
                                <option value="">- Pilih Pasien -</option>
                                {rekamMedis.map((rm) => (
                                    <option key={rm.no_rawat} value={rm.no_rawat}>
                                        {rm.pasien.nm_pasien} ({rm.no_rawat})
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.no_rawat} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="jenis_pemeriksaan" value="Jenis Pemeriksaan" />
                            <TextInput
                                id="jenis_pemeriksaan"
                                value={data.jenis_pemeriksaan}
                                onChange={(e) => setData('jenis_pemeriksaan', e.target.value)}
                                className="mt-1 block w-full"
                                placeholder="Cek Darah Lengkap"
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
                                placeholder="Hemoglobin: 14.5 g/dL..."
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
                            Simpan Hasil
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
