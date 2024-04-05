import React from 'react'

const Button = ({
    children,
    type = 'button',
    bgColor,
    textColor,
    className = '',
    ...props
}) => {
    return (
        <button className={`flex w-fit px-2 py-1 rounded-md  ${bgColor} ${textColor} ${className}`} {...props} >
            {children}
        </button >
    )
}

export default Button
