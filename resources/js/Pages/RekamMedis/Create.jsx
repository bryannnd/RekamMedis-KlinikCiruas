import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Create({ kunjungan, obats, tindakans }) {
    // Initial state for form
    const { data, setData, post, processing, errors } = useForm({
        no_rawat: kunjungan?.no_rawat || '',
        no_pasien: kunjungan?.no_pasien || '',
        kd_dokter: kunjungan?.kd_dokter || '',
        keluhan: '',
        diagnosa: '',
        tindakan: [], // Array of selected objects or IDs/details
        resep_obat: [], // Array of objects { kd_obat, jumlah }
    });

    // Local state for interactive UI
    const [selectedObat, setSelectedObat] = useState('');
    const [obatQty, setObatQty] = useState(1);
    const [resepList, setResepList] = useState([]);

    const [selectedTindakan, setSelectedTindakan] = useState('');
    const [tindakanList, setTindakanList] = useState([]);

    // Handlers for Resep Obat
    const addObat = () => {
        if (!selectedObat || obatQty <= 0) return;
        
        const obatObj = obats.find(o => o.kd_obat === selectedObat);
        if (!obatObj) return;

        // Check if already added
        if (resepList.find(r => r.kd_obat === selectedObat)) {
            alert('Obat sudah ada di daftar resep. Hapus dulu jika ingin mengubah.');
            return;
        }

        const newItem = {
            kd_obat: obatObj.kd_obat,
            nm_obat: obatObj.nm_obat,
            jumlah: parseInt(obatQty),
            harga: obatObj.harga
        };

        const newList = [...resepList, newItem];
        setResepList(newList);
        setData('resep_obat', newList); // Update form data
        
        // Reset inputs
        setSelectedObat('');
        setObatQty(1);
    };

    const removeObat = (kd_obat) => {
        const newList = resepList.filter(item => item.kd_obat !== kd_obat);
        setResepList(newList);
        setData('resep_obat', newList);
    };

    // Handlers for Tindakan
    const addTindakan = () => {
        if (!selectedTindakan) return;

        const tindakanObj = tindakans.find(t => t.kd_tindakan === selectedTindakan);
        if (!tindakanObj) return;

        if (tindakanList.find(t => t.kd_tindakan === selectedTindakan)) {
             alert('Tindakan sudah dipilih.');
             return;
        }

        const newItem = {
            kd_tindakan: tindakanObj.kd_tindakan,
            nm_tindakan: tindakanObj.nm_tindakan,
            tarif: tindakanObj.tarif
        };

        const newList = [...tindakanList, newItem];
        setTindakanList(newList);
        setData('tindakan', newList);

        setSelectedTindakan('');
    };

    const removeTindakan = (kd_tindakan) => {
        const newList = tindakanList.filter(item => item.kd_tindakan !== kd_tindakan);
        setTindakanList(newList);
        setData('tindakan', newList);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('rekam_medis.store'));
    };

    if (!kunjungan) {
        return (
             <AuthenticatedLayout header="Pemeriksaan Pasien">
                <div className="p-6 bg-white rounded-lg shadow-sm">
                    <p className="text-red-500">Error: Data kunjungan tidak ditemukan. Silahkan akses dari halaman Antrian.</p>
                    <Link href={route('antrian.index')} className="text-blue-600 mt-4 inline-block">Kembali ke Antrian</Link>
                </div>
             </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout header={`Pemeriksaan: ${kunjungan.pasien.nm_pasien}`}>
            <Head title="Input Rekam Medis" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Patient Info & Clinical Input */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Patient Info Card */}
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <h3 className="text-lg font-semibold text-blue-800 mb-2">Data Pasien</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                             <div>
                                <span className="block text-gray-500">No Rawat</span>
                                <span className="font-medium">{kunjungan.no_rawat}</span>
                            </div>
                            <div>
                                <span className="block text-gray-500">No Pasien</span>
                                <span className="font-medium">{kunjungan.no_pasien}</span>
                            </div>
                            <div>
                                <span className="block text-gray-500">Nama</span>
                                <span className="font-medium">{kunjungan.pasien.nm_pasien}</span>
                            </div>
                             <div>
                                <span className="block text-gray-500">Umur</span>
                                <span className="font-medium">{kunjungan.pasien.umur} Tahun</span>
                            </div>
                        </div>
                    </div>

                    {/* Form Input */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <form onSubmit={submit} id="examForm">
                            <div className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="keluhan" value="Anamnesa / Keluhan" />
                                    <textarea
                                        id="keluhan"
                                        value={data.keluhan}
                                        onChange={(e) => setData('keluhan', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm h-24"
                                        required
                                    ></textarea>
                                    <InputError message={errors.keluhan} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="diagnosa" value="Diagnosa" />
                                     <textarea
                                        id="diagnosa"
                                        value={data.diagnosa}
                                        onChange={(e) => setData('diagnosa', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm h-24"
                                        required
                                    ></textarea>
                                    <InputError message={errors.diagnosa} className="mt-2" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right Column: Actions & Medicine */}
                <div className="space-y-6">
                    {/* Tindakan Section */}
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-md font-semibold text-gray-800 mb-4">Tindakan / Layanan</h3>
                        <div className="flex gap-2 mb-4">
                            <select
                                value={selectedTindakan}
                                onChange={(e) => setSelectedTindakan(e.target.value)}
                                className="block w-full text-sm border-gray-300 rounded-md shadow-sm"
                            >
                                <option value="">Pilih Tindakan</option>
                                {tindakans.map(t => (
                                    <option key={t.kd_tindakan} value={t.kd_tindakan}>{t.nm_tindakan}</option>
                                ))}
                            </select>
                            <button
                                type="button"
                                onClick={addTindakan}
                                className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                            >
                                +
                            </button>
                        </div>
                        
                        {/* List Tindakan */}
                        <ul className="space-y-2">
                            {tindakanList.map((item, idx) => (
                                <li key={idx} className="flex justify-between items-center bg-gray-50 p-2 rounded text-sm">
                                    <span>{item.nm_tindakan}</span>
                                    <button onClick={() => removeTindakan(item.kd_tindakan)} className="text-red-500 hover:text-red-700">x</button>
                                </li>
                            ))}
                            {tindakanList.length === 0 && <p className="text-gray-400 text-xs italic">Belum ada tindakan.</p>}
                        </ul>
                    </div>

                    {/* Resep Obat Section */}
                     <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-md font-semibold text-gray-800 mb-4">Resep Obat</h3>
                         <div className="flex gap-2 mb-2">
                            <select
                                value={selectedObat}
                                onChange={(e) => setSelectedObat(e.target.value)}
                                className="block w-full text-sm border-gray-300 rounded-md shadow-sm"
                            >
                                <option value="">Pilih Obat</option>
                                {obats.map(o => (
                                    <option key={o.kd_obat} value={o.kd_obat}>{o.nm_obat} (Stok: {o.jml_obat})</option>
                                ))}
                            </select>
                         </div>
                         <div className="flex gap-2 mb-4">
                            <TextInput
                                type="number"
                                min="1"
                                value={obatQty}
                                onChange={(e) => setObatQty(e.target.value)}
                                className="w-20 text-sm"
                                placeholder="Qty"
                            />
                            <button
                                type="button"
                                onClick={addObat}
                                className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                            >
                                Tambah Obat
                            </button>
                        </div>

                        {/* List Resep */}
                         <ul className="space-y-2">
                            {resepList.map((item, idx) => (
                                <li key={idx} className="flex justify-between items-center bg-gray-50 p-2 rounded text-sm">
                                    <div className="flex-1">
                                        <div className="font-medium">{item.nm_obat}</div>
                                        <div className="text-xs text-gray-500">Qty: {item.jumlah}</div>
                                    </div>
                                    <button onClick={() => removeObat(item.kd_obat)} className="text-red-500 hover:text-red-700">x</button>
                                </li>
                            ))}
                             {resepList.length === 0 && <p className="text-gray-400 text-xs italic">Belum ada resep.</p>}
                        </ul>
                    </div>

                    
                    {/* Submit Actions */}
                    <div className="flex items-center justify-end gap-4 pt-4">
                         <Link
                            href={route('antrian.index')}
                            className="text-gray-600 hover:text-gray-900 font-medium"
                        >
                            Batal
                        </Link>
                        <PrimaryButton form="examForm" disabled={processing} className="w-full justify-center py-3">
                            Simpan Rekam Medis
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
