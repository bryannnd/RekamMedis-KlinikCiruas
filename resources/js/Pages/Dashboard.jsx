import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { 
    Building2, Users, Stethoscope, Pill, 
    FileBarChart, ClipboardList, UserPlus, 
    FlaskConical
} from 'lucide-react';

export default function Dashboard({ auth, stats }) {
    const { user } = usePage().props.auth;
    const role = user.role;

    return (
        <AuthenticatedLayout header="Overview">
            <Head title="Dashboard" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Welcome Section */}
                    <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 mb-10 shadow-lg text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold mb-2">Selamat Datang, {user.name} 👋</h2>
                            <p className="text-emerald-100 text-lg opacity-90">
                                Anda login sebagai <span className="font-semibold capitalize bg-white/20 px-3 py-1 rounded-lg ml-1">{role}</span>.
                            </p>
                        </div>
                    </div>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats && stats.map((stat, index) => (
                            <StatCard 
                                key={index}
                                title={stat.label}
                                value={stat.value}
                                iconName={stat.icon}
                                color={stat.color}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function StatCard({ title, value, iconName, color = 'emerald' }) {
    const Icons = {
        Building2, Users, Stethoscope, Pill, 
        FileBarChart, ClipboardList, UserPlus, 
        FlaskConical
    };

    const Icon = Icons[iconName] || ClipboardList;

    const colorClasses = {
        emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600' },
        blue: { bg: 'bg-blue-50', text: 'text-blue-600' },
        teal: { bg: 'bg-teal-50', text: 'text-teal-600' },
        indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600' },
        purple: { bg: 'bg-purple-50', text: 'text-purple-600' },
        orange: { bg: 'bg-orange-50', text: 'text-orange-600' },
    };

    const currentTheme = colorClasses[color] || colorClasses.emerald;

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-gray-500 font-medium text-sm mb-1">{title}</h3>
                    <p className="text-3xl font-bold text-gray-900">{value}</p>
                </div>
                <div className={`p-3 rounded-xl ${currentTheme.bg} ${currentTheme.text}`}>
                     <Icon className="w-6 h-6" strokeWidth={2} />
                </div>
            </div>
        </div>
    );
}
