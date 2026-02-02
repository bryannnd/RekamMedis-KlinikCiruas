import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Table from '@/Components/Table';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import TextInput from '@/Components/TextInput';
import { Edit, Trash2 } from 'lucide-react';

export default function Index({ labs, filters }) {
    const { auth } = usePage().props;
    const [search, setSearch] = useState(filters.search || '');

    useEffect(() => {
        const timer = setTimeout(() => {
            router.get(
                route('laboratoriums.index'),
                { search },
                { preserveState: true, replace: true }
            );
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    const columns = [
        { label: 'No Rawat', render: (row) => row.rekam_medis ? row.rekam_medis.no_rawat : row.no_rawat },
        { label: 'Pasien', render: (row) => row.rekam_medis?.pasien ? row.rekam_medis.pasien.nm_pasien : '-' },
        { label: 'Jenis Pemeriksaan', key: 'jenis_pemeriksaan' },
        { label: 'Hasil', key: 'hasil_periksa' },
        { label: 'Tgl Periksa', render: (row) => `${row.tgl_periksa} ${row.jam_periksa}` },
    ];

    const actions = (row) => (
        <div className="flex justify-end gap-2">
            <Link
                href={route('laboratoriums.edit', row.id)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit"
            >
                <Edit className="w-5 h-5" />
            </Link>
            <button
                onClick={() => {
                    if (confirm('Are you sure you want to delete this lab result?')) {
                        router.delete(route('laboratoriums.destroy', row.id));
                    }
                }}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete"
            >
                <Trash2 className="w-5 h-5" />
            </button>
        </div>
    );

    return (
        <AuthenticatedLayout header="Data Hasil Laboratorium">
            <Head title="Laboratorium" />

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <div className="w-full sm:w-1/3">
                        <TextInput
                            type="text"
                            placeholder="Cari Pasien / Jenis Periksa..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <Link
                        href={route('laboratoriums.create')}
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 border border-transparent rounded-xl font-bold text-xs text-white uppercase tracking-widest hover:from-emerald-700 hover:to-teal-700 hover:shadow-lg hover:shadow-emerald-500/30 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all ease-in-out duration-200"
                    >
                        Input Hasil Lab
                    </Link>
                </div>

                <Table
                    columns={columns}
                    data={labs.data}
                    pagination={labs}
                    actions={actions}
                />
            </div>
        </AuthenticatedLayout>
    );
}
