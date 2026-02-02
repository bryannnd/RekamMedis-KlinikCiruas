import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Table from '@/Components/Table';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import TextInput from '@/Components/TextInput';

export default function Index({ kunjungans, filters }) {
    const { auth } = usePage().props;
    const [search, setSearch] = useState(filters.search || '');

    useEffect(() => {
        const timer = setTimeout(() => {
            router.get(
                route('kunjungans.index'),
                { search },
                { preserveState: true, replace: true }
            );
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    const columns = [
        { label: 'No Rawat', key: 'no_rawat' },
        { label: 'Tgl. Registrasi', render: (row) => `${row.tgl_registrasi} ${row.jam_registrasi}` },
        { label: 'Pasien', render: (row) => row.pasien ? `${row.pasien.nm_pasien} (${row.no_pasien})` : '-' },
        { label: 'Dokter', render: (row) => row.dokter ? row.dokter.nm_dokter : '-' },
        { label: 'Poli', render: (row) => row.poliklinik ? row.poliklinik.nm_poli : '-' },
        { label: 'Status', render: (row) => (
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                row.status_periksa === 'Sudah' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
                {row.status_periksa}
            </span>
        )},
    ];

    const actions = (row) => null; // Read-only for now, maybe add logic later

    return (
        <AuthenticatedLayout header="Data Kunjungan">
            <Head title="Data Kunjungan" />

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <div className="w-full sm:w-1/3">
                        <TextInput
                            type="text"
                            placeholder="Cari No Rawat / Pasien..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <Link
                        href={route('kunjungans.create')}
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 border border-transparent rounded-xl font-bold text-xs text-white uppercase tracking-widest hover:from-emerald-700 hover:to-teal-700 hover:shadow-lg hover:shadow-emerald-500/30 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all ease-in-out duration-200"
                    >
                        Registrasi Pasien
                    </Link>
                </div>

                <Table
                    columns={columns}
                    data={kunjungans.data}
                    pagination={kunjungans}
                    actions={actions}
                />
            </div>
        </AuthenticatedLayout>
    );
}
