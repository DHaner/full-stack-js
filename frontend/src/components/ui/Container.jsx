

export function Container({ children, className = "" }) {
    return (
        <div className={`bg-slate-800 flex flex-col items-center py-10 px-8 rounded-lg shadow-md w-full ${className}`}>
            {children}
        </div>
    )
}