import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react'; // Link needed for pagination
import { FileDown, Printer, Activity, AlertCircle, TrendingUp, Calendar, History, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Index({ kunjunganStats, lowStockObats, topDiagnoses, kunjunganHistory }) {
    
    const handlePrint = () => {
        window.print();
    };

    return (
        <AuthenticatedLayout header="Laporan & Statistik">
            <Head title="Laporan & Statistik" />

            <div className="py-6">
                
                {/* Header Actions */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row justify-between items-center gap-4 print:hidden">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <Calendar className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800">Periode Laporan</h3>
                            <p className="text-sm text-gray-500">7 Hari Terakhir</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button 
                            onClick={handlePrint}
                            className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150"
                        >
                            <Printer className="w-4 h-4 mr-2" />
                            Cetak PDF
                        </button>
                        <a 
                            href={route('laporan.export')}
                            className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-lg font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            <FileDown className="w-4 h-4 mr-2" />
                            Download CSV
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 print:grid-cols-1">
                    
                    {/* Kunjungan Card */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-blue-600" />
                                <h3 className="text-lg font-bold text-gray-800">Tren Kunjungan</h3>
                            </div>
                            <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-700 rounded-full">Mingguan</span>
                        </div>
                        
                        {kunjunganStats.length > 0 ? (
                            <div className="space-y-4">
                                {kunjunganStats.map((stat, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-100 last:border-0">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-800">
                                                {new Date(stat.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}
                                            </span>
                                            <span className="text-xs text-gray-500">Total Pasien</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl font-bold text-blue-600">{stat.count}</span>
                                            <span className="text-xs text-gray-400">Org</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500 italic">Belum ada data kunjungan.</div>
                        )}
                    </div>

                    {/* Top Diagnosa Card */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                         <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <Activity className="w-5 h-5 text-purple-600" />
                                <h3 className="text-lg font-bold text-gray-800">Top Diagnosa</h3>
                            </div>
                            <span className="text-xs font-medium px-2 py-1 bg-purple-50 text-purple-700 rounded-full">Terbanyak</span>
                        </div>

                        {topDiagnoses.length > 0 ? (
                            <div className="space-y-3">
                                {topDiagnoses.map((diag, idx) => (
                                    <div key={idx} className="flex items-center justify-between group">
                                        <div className="flex items-center gap-3 w-full">
                                            <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${idx < 3 ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-500'}`}>
                                                {idx + 1}
                                            </span>
                                            <div className="flex-1 border-b border-gray-100 pb-2 group-last:border-0">
                                                <div className="flex justify-between items-center">
                                                     <span className="font-medium text-gray-700">{diag.diagnosa}</span>
                                                     <span className="font-bold text-gray-900">{diag.count}</span>
                                                </div>
                                                <div className="w-full bg-gray-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                                                    <div 
                                                        className="bg-purple-500 h-1.5 rounded-full" 
                                                        style={{ width: `${(diag.count / topDiagnoses[0].count) * 100}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500 italic">Belum ada data diagnosa.</div>
                        )}
                    </div>

                    {/* Low Stock Obat Card */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <AlertCircle className="w-5 h-5 text-red-600" />
                            <h3 className="text-lg font-bold text-gray-800">Peringatan Stok Obat Menipis</h3>
                        </div>

                        {lowStockObats.length > 0 ? (
                            <div className="overflow-x-auto rounded-lg border border-gray-200">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Obat</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sisa Stok</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Satuan</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {lowStockObats.map((obat) => (
                                            <tr key={obat.kd_obat} className="hover:bg-red-50/30 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{obat.kd_obat}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{obat.nm_obat}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-red-600">{obat.jml_obat}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{obat.ukuran}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                        Stok Kritis
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center p-8 bg-green-50 rounded-lg border border-green-100">
                                <div className="p-3 bg-green-100 rounded-full mb-3">
                                    <TrendingUp className="w-6 h-6 text-green-600" />
                                </div>
                                <h4 className="text-green-800 font-bold">Stok Aman</h4>
                                <p className="text-green-600 text-sm mt-1">Tidak ada obat dengan stok kurang dari 10.</p>
                            </div>
                        )}
                    </div>

                    {/* Riwayat Kunjungan Table (Full Width) */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <History className="w-5 h-5 text-gray-700" />
                            <h3 className="text-lg font-bold text-gray-800">Riwayat Kunjungan (30 Hari Terakhir)</h3>
                        </div>

                        {kunjunganHistory.data.length > 0 ? (
                            <>
                                <div className="overflow-x-auto rounded-lg border border-gray-200">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. Rawat</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Registrasi</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jam</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. Rekam Medis</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Pasien</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis Kelamin</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alamat</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Poliklinik Tujuan</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dokter PJ</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {kunjunganHistory.data.map((item) => (
                                                <tr key={item.no_rawat} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.no_rawat}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.tgl_registrasi}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.jam_registrasi}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.no_pasien}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.pasien?.nm_pasien || '-'}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.pasien?.jk === 'L' ? 'Laki-laki' : 'Perempuan'}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 truncate max-w-xs">{item.pasien?.alamat || '-'}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.poliklinik?.nm_poli || '-'}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.dokter?.nm_dokter || '-'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                
                                {/* Pagination */}
                                <div className="mt-4 flex justify-between items-center">
                                    <div className="text-sm text-gray-500">
                                        Menampilkan {kunjunganHistory.from} sampai {kunjunganHistory.to} dari {kunjunganHistory.total} data
                                    </div>
                                    <div className="flex gap-2">
                                        {kunjunganHistory.links.map((link, idx) => (
                                            <Link
                                                key={idx}
                                                href={link.url || '#'}
                                                className={`px-3 py-1 rounded-md text-sm border ${
                                                    link.active 
                                                        ? 'bg-blue-600 text-white border-blue-600' 
                                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                                } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-8 text-gray-500 italic">Belum ada data kunjungan dalam 30 hari terakhir.</div>
                        )}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
