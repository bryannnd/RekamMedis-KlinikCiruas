export default function SecondaryButton({
    type = 'button',
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex items-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-700 shadow-sm transition-all duration-200 ease-in-out hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-25 ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
