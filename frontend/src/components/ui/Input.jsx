

export default function Input({
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    name,
    autoComplete = "off",
    required = true,
    isTextArea = false,
    className = ""
}) {
    return (
        <div className="flex flex-col gap-2 ">
            <label htmlFor={name} className="font-semibold text-slate-300">{label}</label>
            {isTextArea ? (
                <textarea
                    id={name}
                    name={name}
                    className={`border border-slate-500 p-2 rounded placeholder:text-slate-500 focus:border-indigo-500 focus:outline-indigo-500 focus:outline-1 ${className}`}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    value={value}
                    onChange={onChange}
                    required={required}
                />
            ) : (
                <input
                    id={name}
                    type={type}
                    name={name}
                    className={`border border-slate-500 p-2 rounded placeholder:text-slate-500 focus:border-indigo-500 focus:outline-indigo-500 focus:outline-1 ${className}`}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    value={value}
                    onChange={onChange}
                    required={required}
                />
            )}
        </div>
    );
}
