import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Table from '@/Components/Table';
import { Head, Link, usePage } from '@inertiajs/react';
import { Stethoscope } from 'lucide-react';

export default function Index({ antrians }) {
    const { auth } = usePage().props;

    const columns = [
        { label: 'No Antrian', key: 'no_rawat' }, // Using No Rawat as queue ID for now
        { label: 'Jam', key: 'jam_registrasi' },
        { label: 'Nama Pasien', render: (row) => row.pasien ? row.pasien.nm_pasien : '-' },
        { label: 'Poliklinik', render: (row) => row.poliklinik ? row.poliklinik.nm_poli : '-' },
        { label: 'Dokter', render: (row) => row.dokter ? row.dokter.nm_dokter : '-' },
        { label: 'Status', render: (row) => (
             <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                Menunggu
            </span>
        )},
    ];

    const actions = (row) => (
        <div className="flex justify-end gap-2">
            <Link
                href={route('rekam_medis.create', { no_rawat: row.no_rawat })}
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                title="Periksa"
            >
                <Stethoscope className="w-5 h-5" />
            </Link>
        </div>
    );

    return (
        <AuthenticatedLayout header="Antrian Pasien Hari Ini">
            <Head title="Antrian Pasien" />

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                {antrians.data.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">
                        Tidak ada antrian pasien saat ini.
                    </div>
                ) : (
                    <Table
                        columns={columns}
                        data={antrians.data}
                        pagination={antrians}
                        actions={actions}
                    />
                )}
            </div>
        </AuthenticatedLayout>
    );
}
