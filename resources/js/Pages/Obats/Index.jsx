import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Table from '@/Components/Table';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import TextInput from '@/Components/TextInput';
import { Edit, Trash2 } from 'lucide-react';

export default function Index({ obats, filters }) {
    const { auth } = usePage().props;
    const [search, setSearch] = useState(filters.search || '');

    useEffect(() => {
        const timer = setTimeout(() => {
            router.get(
                route('obats.index'),
                { search },
                { preserveState: true, replace: true }
            );
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    const columns = [
        { label: 'Kode Obat', key: 'kd_obat' },
        { label: 'Nama Obat', key: 'nm_obat' },
        { label: 'Jumlah', key: 'jml_obat' },
        { label: 'Ukuran', key: 'ukuran' },
        { label: 'Harga', render: (row) => `Rp ${new Intl.NumberFormat('id-ID').format(row.harga)}` },
    ];

    const actions = (row) => (
        <div className="flex justify-end gap-2">
            <Link
                href={route('obats.edit', row.kd_obat)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit"
            >
                <Edit className="w-5 h-5" />
            </Link>
            <button
                onClick={() => {
                    if (confirm('Are you sure you want to delete this obat?')) {
                        router.delete(route('obats.destroy', row.kd_obat));
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
        <AuthenticatedLayout header="Data Obat">
            <Head title="Data Obat" />

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <div className="w-full sm:w-1/3">
                        <TextInput
                            type="text"
                            placeholder="Cari obat..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <Link
                        href={route('obats.create')}
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 border border-transparent rounded-xl font-bold text-xs text-white uppercase tracking-widest hover:from-emerald-700 hover:to-teal-700 hover:shadow-lg hover:shadow-emerald-500/30 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all ease-in-out duration-200"
                    >
                        Tambah Obat
                    </Link>
                </div>

                <Table
                    columns={columns}
                    data={obats.data}
                    pagination={obats}
                    actions={actions}
                />
            </div>
        </AuthenticatedLayout>
    );
}
