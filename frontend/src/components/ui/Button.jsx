

export default function Button ({ children, type = "button", onClick, className = "" }) {
    return (
        <button 
            type={type} 
            onClick={onClick}
            className={`bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded cursor-pointer w-full  ${className}`}
        >
            {children}
        </button>
    )
}