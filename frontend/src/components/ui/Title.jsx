
export default function Title({ children, className = "" }) {
    return (
        <h1 className={`text-indigo-500 font-bold text-3xl ${className}`}>
            {children}
        </h1>
    )
}