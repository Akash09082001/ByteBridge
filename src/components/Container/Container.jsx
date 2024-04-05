import React from 'react'

const Container = ({ children, className = '' }) => {
    return (
        <div className={`flex w-full px-5 ${className}`}>
            {children}
        </div>
    )
}
export default Container;
