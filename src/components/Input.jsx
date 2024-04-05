import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full flex'>
            <fieldset className='flex flex-col rounded-lg w-full border border-gray-500 group transition-all hover:border-purple-600'>
                <legend className='ml-2 w-fit flex'>
                    {label &&
                        <label
                            className='text-gray-200 transition-all group-hover:text-purple-600 text-sm'
                            htmlFor={id}>
                            {label}
                        </label>
                    }
                </legend>
                <input
                    type={type}
                    className={`flex px-3 py-2 rounded-lg text-sm bg-transparent text-white outline-none w-full ${className}`}
                    ref={ref}
                    {...props}
                    id={id}
                />
            </fieldset>
        </div>
    )
})

export default Input