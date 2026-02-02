import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-6 text-sm font-medium text-emerald-600 bg-emerald-50 p-4 rounded-xl text-center border border-emerald-100">
                    {status}
                </div>
            )}

            <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Selamat Datang</h2>
                <p className="text-sm text-gray-500 mt-2">Masuk untuk mengakses layanan rekam medis.</p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <TextInput
                        id="username"
                        type="text"
                        name="username"
                        value={data.username}
                        className="mt-1 block w-full px-4 py-3.5 bg-gray-50 border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 placeholder-gray-400 text-gray-900"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('username', e.target.value)}
                        placeholder="Username"
                    />
                    <InputError message={errors.username} className="mt-2" />
                </div>

                <div>
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full px-4 py-3.5 bg-gray-50 border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 placeholder-gray-400 text-gray-900"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="Password"
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center cursor-pointer group">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                            className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500/30 w-4 h-4 transition-all"
                        />
                        <span className="ms-2.5 text-sm text-gray-500 group-hover:text-emerald-600 transition-colors">
                            Ingat saya
                        </span>
                    </label>
                </div>

                <div className="pt-2">
                    <PrimaryButton 
                        className="w-full justify-center bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-3.5 rounded-xl text-[15px] font-bold tracking-wide transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/30 active:scale-[0.98]" 
                        disabled={processing}
                    >
                        Masuk
                    </PrimaryButton>
                    
                    <p className="mt-6 text-center text-xs text-gray-400">
                        Tidak memiliki akun? Hubungi administrator.
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
