import React, { useState, useEffect, useCallback, memo, useRef } from 'react';
import { Link, Head } from '@inertiajs/react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { 
    HeartPulse, Shield, Clock, ChevronRight, CheckCircle2, 
    LayoutDashboard, Users, Stethoscope, Pill, Sparkles,
    ArrowRight, Menu, X, Plus
} from 'lucide-react';

// --- Internal Components & Hooks ---

// 3D Tilt Hook
function useTilt(active = true) {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 30 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 30 });

    const handleMouseMove = useCallback((e) => {
        if (!ref.current || !active) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;
        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    }, [x, y, active]);

    const handleMouseLeave = useCallback(() => {
        x.set(0);
        y.set(0);
    }, [x, y]);

    return { ref, rotateX: useTransform(mouseY, [-0.5, 0.5], [10, -10]), rotateY: useTransform(mouseX, [-0.5, 0.5], [-10, 10]), handleMouseMove, handleMouseLeave };
}

const FloatingParticles = memo(() => {
    // Generate random particles
    const particles = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 5,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute text-emerald-100/30"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        fontSize: `${p.size}px`
                    }}
                    animate={{
                        y: [0, -100, 0],
                        x: [0, 50, -50, 0],
                        opacity: [0.3, 0.8, 0.3],
                        rotate: [0, 360]
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "linear",
                        delay: p.delay
                    }}
                >
                    <Plus />
                </motion.div>
            ))}
        </div>
    );
});

const StatusBadge = memo(() => (
    <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-xs font-bold uppercase tracking-wide mb-6 shadow-sm hover:shadow-orange-200/50 hover:scale-105 transition-all cursor-default"
    >
        
    </motion.div>
));

const Navbar = memo(({ auth }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-md' : 'bg-transparent'}`}
        >
            <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="h-10 w-10 bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <HeartPulse className="w-6 h-6" />
                    </div>
                    <span className="font-extrabold text-xl tracking-tight text-gray-900 group-hover:text-emerald-700 transition-colors">Klinik<span className="text-emerald-600">Ciruas</span></span>
                </Link>

                <div className="hidden md:flex items-center gap-2">
                    {['Fitur', 'Keamanan'].map((item) => (
                        <Link key={item} href={`#${item.toLowerCase()}`} className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-emerald-600 transition-all hover:bg-emerald-50 rounded-lg">
                            {item}
                        </Link>
                    ))}
                    <div className="w-px h-6 bg-gray-200 mx-2"></div>
                    {auth.user ? (
                        <Link href={route('dashboard')} className="px-6 py-2.5 rounded-full bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 ring-2 ring-gray-900 ring-offset-2">
                            Dashboard
                        </Link>
                    ) : (
                        <>

                            <Link href={route('login')} className="group flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-bold hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-0.5 active:scale-95">
                                Mulai Sekarang <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </>
                    )}
                </div>

                <button className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>
            
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
                    >
                         <div className="px-6 py-4 space-y-2">
                            {['Fitur', 'Keamanan'].map((item) => (
                                <Link key={item} href={`#${item.toLowerCase()}`} className="block py-3 text-gray-600 font-semibold hover:text-emerald-600 border-b border-gray-50 last:border-0">{item}</Link>
                            ))}
                            <Link href={route('login')} className="block py-3 text-emerald-600 font-bold">Masuk / Daftar</Link>
                         </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
});

const FeatureCard = memo(({ icon: Icon, title, desc, delay }) => {
    const { ref, rotateX, rotateY, handleMouseMove, handleMouseLeave } = useTilt(true);

    return (
        <motion.div 
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay, duration: 0.6, type: "spring" }}
            className="relative p-8 rounded-3xl bg-white border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-shadow duration-300 group overflow-hidden"
        >
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-sm border border-emerald-100">
                <Icon className="w-7 h-7" />
            </div>
            <h3 className="relative z-10 text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors">{title}</h3>
            <p className="relative z-10 text-gray-500 text-[15px] leading-relaxed group-hover:text-gray-600 transition-colors">{desc}</p>
        </motion.div>
    );
});

const StatCard = ({ value, label, delay }) => (
    <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay, type: "spring", stiffness: 200 }}
        className="text-center p-6 bg-white rounded-3xl shadow-lg border border-gray-50 hover:-translate-y-2 transition-transform duration-300"
    >
        <h4 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-emerald-600 to-teal-600 mb-2">{value}</h4>
        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">{label}</p>
    </motion.div>
);

// --- Main Page Component ---

export default function Welcome({ auth }) {
    const { scrollYProgress } = useScroll();
    const yHero = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    
    // Tilt for hero image
    const { ref: heroImgRef, rotateX, rotateY, handleMouseMove, handleMouseLeave } = useTilt();

    return (
        <>
            <Head title="Klinik Ciruas" />
            <div className="min-h-screen bg-[#F0FDF4] font-sans text-gray-900 selection:bg-emerald-500 selection:text-white overflow-x-hidden">
                <Navbar auth={auth} />

                {/* Hero Section */}
                <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-screen flex items-center">
                    <FloatingParticles />
                    
                    {/* Living Background */}
                    <div className="absolute inset-0 pointer-events-none">
                        <motion.div 
                             animate={{ 
                                scale: [1, 1.2, 1],
                                rotate: [0, 45, 0],
                                x: [0, 100, 0]
                             }}
                             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                             className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-gradient-to-br from-emerald-200/40 to-teal-200/40 rounded-full blur-[120px]"
                        />
                        <motion.div 
                             animate={{ 
                                scale: [1, 1.3, 1],
                                x: [0, -100, 0]
                             }}
                             transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 2 }}
                             className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-gradient-to-tr from-lime-200/40 to-emerald-200/40 rounded-full blur-[100px]"
                        />
                    </div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16">
                        {/* Text Content */}
                        <motion.div 
                            style={{ y: yHero, opacity: opacityHero }}
                            className="w-full lg:w-1/2 text-center lg:text-left"
                        >
                            <StatusBadge />
                            
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 mb-8 leading-[1.1]">
                                Klinik Ciruas <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 animate-gradient-x">
                                    <Typewriter
                                        options={{
                                            strings: ['Kesehatan.', 'Klinik.', 'Rumah Sakit.', 'Pasien.'],
                                            autoStart: true,
                                            loop: true,
                                            deleteSpeed: 50,
                                            delay: 80
                                        }}
                                    />
                                </span>
                            </h1>

                            <p className="text-lg md:text-xl text-gray-500 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
                                Platform rekam medis digital yang <span className="text-emerald-600 font-bold">mencintai</span> efisiensi. 
                                Kelola diagnosa, pasien, dan stok obat.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">


                            </div>


                        </motion.div>

                        {/* Illustration/Image - 3D Tilt Wrapper */}
                        <motion.div 
                             ref={heroImgRef}
                             onMouseMove={handleMouseMove}
                             onMouseLeave={handleMouseLeave}
                             style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                             className="w-full lg:w-1/2 relative perspective-1000 z-20"
                        >
                             <motion.div
                                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                transition={{ duration: 1, type: "spring" }}
                                className="relative rounded-3xl shadow-2xl shadow-emerald-900/20 bg-white p-2 border border-gray-100"
                             >
                                <img 
                                    src="/images/hero-dashboard.png" 
                                    alt="App Dashboard" 
                                    className="rounded-2xl w-full h-auto"
                                />
                                
                                {/* Floating Overlay Cards */}
                                <motion.div 
                                    animate={{ y: [0, -15, 0] }}
                                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                                    className="absolute -left-10 top-20 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 hidden lg:block"
                                    style={{ transform: "translateZ(50px)" }}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-red-100 rounded-xl text-red-600">
                                            <HeartPulse className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-bold uppercase">Detak Jantung</p>
                                            <p className="text-xl font-black text-gray-900">72 <span className="text-sm font-normal text-gray-500">Bpm</span></p>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div 
                                    animate={{ y: [0, 15, 0] }}
                                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
                                    className="absolute -right-8 bottom-20 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 hidden lg:block"
                                    style={{ transform: "translateZ(30px)" }}
                                >
                                </motion.div>
                             </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="fitur" className="py-32 relative bg-white">
                    <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#F0FDF4] to-white"></div>
                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="text-center max-w-3xl mx-auto mb-24">
                            <motion.span 
                                initial={{ opacity: 0, y: 20 }} 
                                whileInView={{ opacity: 1, y: 0 }}
                                className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 font-bold tracking-wide uppercase text-xs mb-4 border border-emerald-100"
                            >
                                Apa Yang Ada Di Website ini?
                            </motion.span>
                            <motion.h2 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6"
                            >
                                Fitur Lengkap untuk <span className="text-emerald-600">Klinik Modern</span>
                            </motion.h2>
                            <motion.p 
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-xl text-gray-500 max-w-2xl mx-auto"
                            >
                                Website ini Menyediakan semua alat yang Anda butuhkan untuk meningkatkan efisiensi dan kualitas layanan kesehatan.
                            </motion.p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                            <FeatureCard 
                                icon={Users} 
                                title="Manajemen Pasien 360°" 
                                desc="Database pasien terpusat dengan riwayat medis lengkap, timeline visual, dan pencarian instan."
                                delay={0.1}
                            />
                            <FeatureCard 
                                icon={Stethoscope} 
                                title="Rekam Medis Cerdas" 
                                desc="Input diagnosa ICD-10 otomatis, template resep digital, dan voice-to-text notes."
                                delay={0.2}
                            />
                            <FeatureCard 
                                icon={Pill} 
                                title="Farmasi Terintegrasi" 
                                desc="Stok obat realtime dengan prediksi kebutuhan berbasis AI dan notifikasi kadaluarsa."
                                delay={0.3}
                            />
                            <FeatureCard 
                                icon={LayoutDashboard} 
                                title="Analytics Dashboard" 
                                desc="Pantau pertumbuhan klinik Anda dengan grafik interaktif pendapatan dan kunjungan."
                                delay={0.4}
                            />
                            <FeatureCard 
                                icon={Shield} 
                                title="Bank-Grade Security" 
                                desc="Enkripsi AES-256, Audit Logs, dan backup otomatis per jam ke cloud secure storage."
                                delay={0.5}
                            />
                            <FeatureCard 
                                icon={Clock} 
                                title="Smart Scheduling" 
                                desc="Sistem antrian online dan booking janji temu yang mengurangi waktu tunggu pasien."
                                delay={0.6}
                            />
                        </div>
                    </div>
                </section>

                {/* Stats Section with Parallax */}
                <section className="py-24 bg-emerald-900 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                    <motion.div style={{ y: useTransform(scrollYProgress, [0.4, 0.8], [0, -100]) }} className="absolute -top-1/2 -left-1/4 w-[1000px] h-[1000px] bg-emerald-500/20 rounded-full blur-[150px]"></motion.div>
                    <motion.div style={{ y: useTransform(scrollYProgress, [0.4, 0.8], [0, 100]) }} className="absolute -bottom-1/2 -right-1/4 w-[800px] h-[800px] bg-teal-500/20 rounded-full blur-[150px]"></motion.div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                            <StatCard value="15k+" label="Pasien Terdaftar" delay={0.1} />
                            <StatCard value="850+" label="Dokter Spesialis" delay={0.2} />
                            <StatCard value="99.9%" label="Server Uptime" delay={0.3} />
                            <StatCard value="24/7" label="Customer Care" delay={0.4} />
                        </div>
                    </div>
                </section>



                {/* Secure Banner */}
                <section id="keamanan" className="py-32 bg-white relative overflow-hidden">
                     <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-[3rem] p-12 md:p-20 overflow-hidden relative shadow-2xl">
                             <FloatingParticles />
                             
                             <div className="absolute top-0 right-0 w-2/3 h-full bg-[url('/images/pattern.png')] opacity-5 mix-blend-overlay"></div>
                             
                             <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
                                <motion.div 
                                    className="md:w-1/2 text-left"
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-emerald-400 font-bold text-sm mb-6 backdrop-blur-sm border border-white/5">
                                        <Shield className="w-4 h-4" /> ISO 27001 Certified
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Keamanan Data Anda <br/>Adalah <span className="text-emerald-400">Reputasi Kami.</span></h2>
                                    <p className="text-lg text-gray-400 mb-8 leading-relaxed max-w-lg">
                                        Website ini tidak main-main dengan data medis. Enkripsi end-to-end, akses biometrik, dan kepatuhan penuh terhadap regulasi kesehatan nasional.
                                    </p>

                                </motion.div>
                                
                                <motion.div 
                                    className="md:w-1/2 flex justify-center"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="relative w-64 h-64 md:w-80 md:h-80">
                                        <motion.div 
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                            className="absolute inset-0 border-2 border-dashed border-gray-700 rounded-full"
                                        ></motion.div>
                                        <motion.div 
                                            animate={{ rotate: -360 }}
                                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                            className="absolute inset-8 border border-gray-600 rounded-full opacity-50"
                                        ></motion.div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Shield className="w-24 h-24 text-emerald-500" />
                                        </div>
                                        <div className="absolute inset-0 animate-pulse bg-emerald-500/20 rounded-full filter blur-xl"></div>
                                    </div>
                                </motion.div>
                             </div>
                        </div>
                     </div>
                </section>

                {/* Footer */}
                <footer className="bg-white pt-20 pb-10 border-t border-gray-100">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid md:grid-cols-4 gap-12 mb-16">
                            <div className="col-span-1 md:col-span-2">
                                <Link href="/" className="flex items-center gap-2 mb-6">
                                    <div className="h-8 w-8 bg-emerald-600 text-white rounded-lg flex items-center justify-center">
                                        <HeartPulse className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-xl text-gray-900">Klinik<span className="text-emerald-600">Ciruas</span></span>
                                </Link>
                                <p className="text-gray-500 max-w-sm leading-relaxed">
                                    Membangun ekosistem kesehatan digital yang lebih baik untuk Indonesia. Satu pasien, satu data, jutaan senyuman.
                                </p>
                            </div>
                        </div>
                        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400 font-medium">
                            <p>&copy; {new Date().getFullYear()} Klinik Ciruas. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>

            {/* Global Styles handled in Tailwind Config */}
        </>
    );
}

