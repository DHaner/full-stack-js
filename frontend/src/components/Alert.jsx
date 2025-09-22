import React from "react";

export default function Alert({ message, error = false }) {
    return (
        <div className={`alert ${error ? "bg-red-500" : "bg-green-500"}`}>
            {message}
        </div>
    );
}
