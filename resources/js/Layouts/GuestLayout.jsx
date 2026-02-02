import { Link } from '@inertiajs/react';
import { HeartPulse, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const FloatingParticles = () => {
    // Generate random particles
    const particles = Array.from({ length: 15 }).map((_, i) => ({
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
                    className="absolute text-emerald-500/10"
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
};

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6 selection:bg-emerald-500 selection:text-white relative overflow-hidden">
            <FloatingParticles />
            
            <div className="w-full max-w-[420px] relative z-10">
                <div className="flex flex-col items-center mb-8">
                    <Link href="/" className="group flex flex-col items-center gap-4">
                        <div className="h-14 w-14 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200/50 transition-all duration-300 group-hover:scale-105 group-hover:shadow-emerald-300/50">
                            <HeartPulse className="w-8 h-8" strokeWidth={2.5} />
                        </div>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 tracking-tight">
                            Klinik Ciruas
                        </span>
                    </Link>
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full bg-white/80 backdrop-blur-xl px-8 py-10 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] border border-white/50 rounded-[32px]"
                >
                    {children}
                </motion.div>

                <div className="mt-8 text-center text-xs text-emerald-600/60 font-medium">
                    &copy; {new Date().getFullYear()} Klinik Ciruas.
                </div>
            </div>
        </div>
    );
}
