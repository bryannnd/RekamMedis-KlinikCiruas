import { Link, usePage } from '@inertiajs/react';
import { HeartPulse, LayoutDashboard, Users, Stethoscope, Building2, Pill, ClipboardList, UserPlus, Calendar, FileText, FlaskConical, LogOut } from 'lucide-react';

export default function Sidebar({ className }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const role = user.role || 'petugas';

    // Define menu items
    const links = [
        { label: 'Dashboard', route: 'dashboard', roles: ['admin', 'dokter', 'petugas', 'manajer'], icon: LayoutDashboard },
        
        // Admin Master Data
        { label: 'Kelola Pengguna', route: 'users.index', roles: ['admin'], icon: Users },
        { label: 'Data Dokter', route: 'dokters.index', roles: ['admin', 'manajer'], icon: Stethoscope },
        { label: 'Data Poliklinik', route: 'polikliniks.index', roles: ['admin', 'manajer'], icon: Building2 },
        { label: 'Data Obat', route: 'obats.index', roles: ['admin', 'manajer', 'dokter'], icon: Pill },
        { label: 'Data Tindakan', route: 'tindakans.index', roles: ['admin', 'manajer'], icon: ClipboardList },

        // Petugas
        { label: 'Pendaftaran Pasien', route: 'pasiens.index', roles: ['admin', 'petugas'], icon: UserPlus },
        { label: 'Kunjungan', route: 'kunjungans.index', roles: ['admin', 'petugas'], icon: Calendar },

        // Dokter
        { label: 'Antrian Pasien', route: 'antrian.index', roles: ['dokter'], icon: Users },
        { label: 'Rekam Medis', route: 'rekam_medis.index', roles: ['dokter'], icon: FileText },
        
        // Lab
        { label: 'Laboratorium', route: 'laboratoriums.index', roles: ['admin', 'petugas', 'dokter'], icon: FlaskConical },

        // Manajer/Laporan
        { label: 'Laporan', route: 'laporan.index', roles: ['admin', 'manajer'], icon: FileText },
    ];

    return (
        <aside className={`${className} bg-white border-r border-gray-200 w-64 min-h-screen flex flex-col shadow-sm z-30`}>
            {/* Logo Section */}
            <div className="h-20 flex items-center px-6 border-b border-dashed border-gray-200">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="h-9 w-9 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl flex items-center justify-center shadow-md shadow-emerald-200/50 transition-transform group-hover:scale-110">
                        <HeartPulse className="w-5 h-5" strokeWidth={2.5} />
                    </div>
                    <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 tracking-tight">
                        Klinik Ciruas
                    </span>
                </Link>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
                {links.filter(link => link.roles.includes(role)).map((link, index) => {
                    const isActive = route().current(link.route + '*');
                    const Icon = link.icon;
                    return (
                        <Link
                            key={index}
                            href={route(link.route)} 
                            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${
                                isActive
                                    ? 'bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-100'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                        >
                            <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-600' : 'text-gray-400 group-hover:text-gray-600'}`} strokeWidth={isActive ? 2 : 1.5} />
                            {link.label}
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile Section */}
            <div className="p-4 border-t border-gray-200 bg-gray-50/50">
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center text-emerald-700 font-bold border border-emerald-200 shadow-sm">
                        {user.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                        <p className="text-xs text-emerald-600 font-medium capitalize truncate bg-emerald-50 inline-block px-2 py-0.5 rounded-full border border-emerald-100">
                            {user.role}
                        </p>
                    </div>
                </div>
                <Link 
                    href={route('logout')} 
                    method="post" 
                    as="button"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-red-600 hover:text-white hover:bg-red-500 rounded-lg transition-all border border-red-100 hover:border-red-500"
                >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                </Link>
            </div>
        </aside>
    );
}
