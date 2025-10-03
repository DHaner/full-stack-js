

export default function Button ({ 
    children, 
    type = "button", 
    onClick, 
    className = "",
    color = "indigo"
}) {
    const colorClasses = {
        indigo: "bg-indigo-500 hover:bg-indigo-600",
        red: "bg-red-500 hover:bg-red-600",
    };

    const bgClass = colorClasses[color] || colorClasses.indigo;

    return (
        <button 
            type={type} 
            onClick={onClick}
            className={`${bgClass} text-white font-bold py-2 px-4 rounded cursor-pointer w-full ${className}`}
        >
            {children}
        </button>
    )
}