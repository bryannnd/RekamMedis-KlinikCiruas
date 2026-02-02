import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Table({ columns, data, pagination, actions }) {
    if (!data || data.length === 0) {
        return (
            <div className="p-10 text-center text-gray-500 bg-white rounded-xl border border-dashed border-gray-300 shadow-sm">
                <p className="text-lg font-medium">Data tidak ditemukan.</p>
                <p className="text-sm mt-1">Belum ada data yang tersedia untuk ditampilkan.</p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-xl border border-gray-100">
            <div className="overflow-x-auto"> {/* Mobile Responsiveness Wrapper */}
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-emerald-50/50">
                        <tr>
                            {columns.map((col, index) => (
                                <th
                                    key={index}
                                    scope="col"
                                    className="px-6 py-4 text-left text-xs font-bold text-emerald-800 uppercase tracking-wider whitespace-nowrap"
                                >
                                    {col.label}
                                </th>
                            ))}
                            {actions && (
                                <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-emerald-800 uppercase tracking-wider">
                                    Aksi
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {data.map((row, rowIndex) => (
                            <motion.tr 
                                key={rowIndex} 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: rowIndex * 0.05, duration: 0.2 }}
                                className="hover:bg-emerald-50/30 transition-colors duration-200 group"
                            >
                                {columns.map((col, colIndex) => (
                                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 group-hover:text-gray-900">
                                        {col.render ? col.render(row) : row[col.key]}
                                    </td>
                                ))}
                                {actions && (
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        {actions(row)}
                                    </td>
                                )}
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {pagination && pagination.links && (
                <div className="bg-white px-4 py-4 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Menampilkan <span className="font-semibold text-emerald-600">{pagination.from}</span> sampai <span className="font-semibold text-emerald-600">{pagination.to}</span> dari <span className="font-semibold text-emerald-600">{pagination.total}</span> hasil
                            </p>
                        </div>
                        <div>
                            <nav className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px" aria-label="Pagination">
                                {pagination.links.map((link, index) => {
                                    const isFirst = index === 0;
                                    const isLast = index === pagination.links.length - 1;
                                    
                                    return (
                                        link.url ? (
                                            <Link
                                                key={index}
                                                href={link.url}
                                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors duration-200
                                                    ${link.active 
                                                        ? 'z-10 bg-emerald-50 border-emerald-500 text-emerald-700' 
                                                        : 'bg-white border-gray-300 text-gray-500 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200'
                                                    }
                                                    ${isFirst ? 'rounded-l-lg' : ''} 
                                                    ${isLast ? 'rounded-r-lg' : ''}
                                                `}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ) : (
                                            <span
                                                key={index}
                                                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-gray-50 text-sm font-medium text-gray-400 
                                                    ${isFirst ? 'rounded-l-lg' : ''} 
                                                    ${isLast ? 'rounded-r-lg' : ''}
                                                `}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        )
                                    );
                                })}
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
