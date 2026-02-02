import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, User, Stethoscope, FileText, Pill, Activity } from 'lucide-react';

export default function Show({ rekam }) {
    return (
        <AuthenticatedLayout header={`Detail Rekam Medis: ${rekam.no_rawat}`}>
            <Head title={`Detail ${rekam.no_rawat}`} />

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 space-y-6">
                
                {/* Back Button */}
                <div>
                     <Link
                        href={route('rekam_medis.index')}
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Kembali ke daftar
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Patient & Doctor Info */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                    <User className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-lg text-gray-900">Data Pasien</h3>
                            </div>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Nama Pasien</label>
                                    <p className="text-gray-900 font-medium text-lg">{rekam.pasien.nm_pasien}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">No Pasien</label>
                                        <p className="text-gray-700 font-medium">{rekam.no_pasien}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Jenis Kelamin</label>
                                        <p className="text-gray-700 font-medium">{rekam.pasien.jk === 'L' ? 'Laki-laki' : 'Perempuan'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                             <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                                    <Stethoscope className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-lg text-gray-900">Dokter Pemeriksa</h3>
                            </div>
                             <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Nama Dokter</label>
                                    <p className="text-gray-900 font-medium text-lg">{rekam.dokter.nm_dokter}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Poliklinik</label>
                                    <p className="text-gray-700 font-medium">{rekam.kunjungan?.poliklinik?.nm_poli || '-'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Medical Record Details */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                             <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-lg text-gray-900">Hasil Pemeriksaan</h3>
                            </div>

                            <div className="grid gap-6">
                                <div>
                                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 block">Anamnesa / Keluhan</label>
                                    <div className="bg-gray-50 p-4 rounded-xl text-gray-700 whitespace-pre-wrap leading-relaxed">
                                        {rekam.keluhan}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 block">Diagnosa</label>
                                    <div className="bg-gray-50 p-4 rounded-xl text-gray-700 whitespace-pre-wrap leading-relaxed">
                                        {rekam.diagnosa}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Tindakan */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                                        <Activity className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-900">Tindakan</h3>
                                </div>
                                {rekam.tindakan && rekam.tindakan.length > 0 ? (
                                    <ul className="space-y-3">
                                        {rekam.tindakan.map((t, idx) => (
                                            <li key={idx} className="flex justify-between items-center text-sm border-b border-gray-50 pb-2 last:border-0">
                                                <span className="font-medium text-gray-700">{t.nm_tindakan}</span>
                                                <span className="text-gray-500 bg-gray-50 px-2 py-1 rounded">Rp {parseFloat(t.tarif).toLocaleString('id-ID')}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-400 italic text-sm">Tidak ada tindakan.</p>
                                )}
                            </div>

                            {/* Resep Obat */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-teal-50 text-teal-600 rounded-lg">
                                        <Pill className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-900">Resep Obat</h3>
                                </div>
                                {rekam.resep_obat && rekam.resep_obat.length > 0 ? (
                                    <ul className="space-y-3">
                                        {rekam.resep_obat.map((o, idx) => (
                                            <li key={idx} className="flex justify-between items-center text-sm border-b border-gray-50 pb-2 last:border-0">
                                                <span className="font-medium text-gray-700">{o.nm_obat}</span>
                                                <span className="text-gray-500 font-semibold">{o.jumlah} pcs</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-400 italic text-sm">Tidak ada resep obat.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
