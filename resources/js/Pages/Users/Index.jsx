import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Table from '@/Components/Table';
import TextInput from '@/Components/TextInput';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Edit, Trash2 } from 'lucide-react';

export default function Index({ users, filters }) {
    const { auth } = usePage().props;
    const [search, setSearch] = useState(filters.search || '');

    useEffect(() => {
        const timer = setTimeout(() => {
            router.get(
                route('users.index'),
                { search },
                { preserveState: true, replace: true }
            );
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    const columns = [
        { label: 'Nama', key: 'name' },
        { label: 'Username', key: 'username' },
        { label: 'Email', key: 'email' },
        { label: 'Role', render: (row) => <span className="capitalize px-2 py-1 bg-gray-100 rounded text-xs font-semibold">{row.role}</span> },
    ];

    const actions = (row) => (
        <div className="flex justify-end gap-2">
            <Link
                href={route('users.edit', row.id)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit"
            >
                <Edit className="w-5 h-5" />
            </Link>
            {row.id !== auth.user.id && (
                <button
                    onClick={() => {
                        if (confirm('Apakah anda yakin ingin menghapus user ini?')) {
                            router.delete(route('users.destroy', row.id));
                        }
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Hapus"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            )}
        </div>
    );

    return (
        <AuthenticatedLayout header="Kelola Pengguna">
            <Head title="Users" />

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <div className="w-full sm:w-1/3">
                        <TextInput
                            type="text"
                            placeholder="Cari User..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <Link
                        href={route('users.create')}
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 border border-transparent rounded-xl font-bold text-xs text-white uppercase tracking-widest hover:from-emerald-700 hover:to-teal-700 hover:shadow-lg hover:shadow-emerald-500/30 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all ease-in-out duration-200"
                    >
                        Tambah User
                    </Link>
                </div>

                <Table
                    columns={columns}
                    data={users.data}
                    pagination={users}
                    actions={actions}
                />
            </div>
        </AuthenticatedLayout>
    );
}
