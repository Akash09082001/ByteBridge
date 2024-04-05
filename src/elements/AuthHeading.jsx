import React from 'react'

const AuthHeading = ({ text, className = '' }) => {
    return (
        <div className="flex w-full">
            <strong className={`text-3xl font-bold ${className}`}>
                {text}
            </strong>
        </div>
    )
}

export default AuthHeading
