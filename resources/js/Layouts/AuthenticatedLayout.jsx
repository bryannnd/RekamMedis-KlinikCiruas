import { useState } from 'react';
import Sidebar from '@/Components/Sidebar';
import { usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AuthenticatedLayout({ header, children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const user = usePage().props.auth.user;

    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            {/* Desktop Sidebar */}
            <Sidebar className="hidden md:flex print:hidden" />

            {/* Mobile Sidebar (Drawer) */}
            <div className={`fixed inset-0 z-40 md:hidden print:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}>
                {/* Backdrop */}
                <div 
                    className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
                
                {/* Drawer Content */}
                <div className="fixed inset-y-0 left-0 flex w-full max-w-xs flex-col bg-white">
                    <button 
                        className="absolute top-0 right-0 -mr-12 pt-2"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                         <span className="sr-only">Close sidebar</span>
                         <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                         </svg>
                    </button>
                    <Sidebar className="flex h-full" />
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Mobile Header */}
                <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 md:hidden print:hidden">
                    <button 
                        onClick={() => setIsSidebarOpen(true)}
                        className="text-gray-500 focus:outline-none focus:text-gray-700"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <div className="text-lg font-bold text-gray-800">Klinik Ciruas</div>
                    <div className="w-6"></div> {/* Spacer for center alignment if needed */}
                </header>

                {/* Desktop Header / Topbar - Optional if Sidebar has user info. 
                    We can add a clean topbar for Breadcrumbs or Page Title. 
                */}
                <header className="hidden md:flex justify-between items-center py-5 px-8 bg-white/80 backdrop-blur-sm border-b border-gray-100 shadow-sm sticky top-0 z-20 print:hidden">
                    <h2 className="text-xl font-bold text-gray-800 leading-tight tracking-tight">
                        {header || 'Dashboard'}
                    </h2>
                    {/* User Profile / Notifications can go here */}
                </header>

                {/* Scrollable Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            key={route().current()} 
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            {children}
                        </motion.div>
                    </div>
                </main>
            </div>
        </div>
    );
}
