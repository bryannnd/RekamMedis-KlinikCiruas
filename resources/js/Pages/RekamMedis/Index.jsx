import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Table from '@/Components/Table';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import TextInput from '@/Components/TextInput';
import { Eye } from 'lucide-react';

export default function Index({ rekams, filters }) {
    const { auth } = usePage().props;
    const [search, setSearch] = useState(filters.search || '');

    useEffect(() => {
        const timer = setTimeout(() => {
            router.get(
                route('rekam_medis.index'),
                { search },
                { preserveState: true, replace: true }
            );
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    const columns = [
        { label: 'No Rawat', key: 'no_rawat' },
        { label: 'Tanggal', render: (row) => new Date(row.created_at).toLocaleDateString() },
        { label: 'Pasien', render: (row) => row.pasien ? `${row.pasien.nm_pasien}` : '-' },
        { label: 'Dokter', render: (row) => row.dokter ? row.dokter.nm_dokter : '-' },
        { label: 'Diagnosa', key: 'diagnosa' },
    ];

    const actions = (row) => (
         <div className="flex justify-end gap-2">
            <Link
                href={route('rekam_medis.show', row.no_rawat)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Detail"
            >
                <Eye className="w-5 h-5" />
            </Link>
        </div>
    );

    return (
        <AuthenticatedLayout header="Riwayat Rekam Medis">
            <Head title="Rekam Medis" />

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
                </div>

                <Table
                    columns={columns}
                    data={rekams.data}
                    pagination={rekams}
                    actions={actions}
                />
            </div>
        </AuthenticatedLayout>
    );
}
