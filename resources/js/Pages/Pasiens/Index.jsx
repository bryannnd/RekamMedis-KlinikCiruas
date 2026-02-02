import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Table from '@/Components/Table';
import TextInput from '@/Components/TextInput';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Edit, Trash2 } from 'lucide-react';

export default function Index({ pasiens, filters }) {
    const { auth } = usePage().props;
    const [search, setSearch] = useState(filters.search || '');

    useEffect(() => {
        const timer = setTimeout(() => {
            router.get(
                route('pasiens.index'),
                { search },
                { preserveState: true, replace: true }
            );
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    const columns = [
        { label: 'No Pasien', key: 'no_pasien' },
        { label: 'Nama Pasien', key: 'nm_pasien' },
        { label: 'L/P', key: 'jk' },
        { label: 'Tgl Lahir', key: 'tgl_lhr' },
        { label: 'No Tlp', key: 'no_tlp' },
        { label: 'Alamat', key: 'alamat', render: (row) => <span className="truncate block max-w-xs" title={row.alamat}>{row.alamat}</span> },
    ];

    const actions = (row) => (
        <div className="flex justify-end gap-2">
            <Link
                href={route('pasiens.edit', row.no_pasien)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit"
            >
                <Edit className="w-5 h-5" />
            </Link>
            <button
                onClick={() => {
                    if (confirm('Apakah anda yakin ingin menghapus data pasien ini?')) {
                        router.delete(route('pasiens.destroy', row.no_pasien));
                    }
                }}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Hapus"
            >
                <Trash2 className="w-5 h-5" />
            </button>
        </div>
    );

    return (
        <AuthenticatedLayout header="Data Pasien">
            <Head title="Pasien" />

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <div className="w-full sm:w-1/3">
                        <TextInput
                            type="text"
                            placeholder="Cari Pasien..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <Link
                        href={route('pasiens.create')}
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 border border-transparent rounded-xl font-bold text-xs text-white uppercase tracking-widest hover:from-emerald-700 hover:to-teal-700 hover:shadow-lg hover:shadow-emerald-500/30 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all ease-in-out duration-200"
                    >
                        Tambah Pasien
                    </Link>
                </div>

                <Table
                    columns={columns}
                    data={pasiens.data}
                    pagination={pasiens}
                    actions={actions}
                />
            </div>
        </AuthenticatedLayout>
    );
}
