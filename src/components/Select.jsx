import React, { forwardRef, useId } from 'react';

function Select({ options, label, className, ...props }, ref) {
    const id = useId();

    return (
        <div className="w-full">
            <fieldset className='flex flex-col rounded-lg w-full border group transition-all border-gray-500 hover:border-purple-600'>
                <legend className='ml-2 w-fit flex'>
                    {label && <label htmlFor={id} className='text-gray-200 transition-all group-hover:text-purple-600 text-sm'>{label}</label>}
                </legend>
                <select
                    {...props}
                    id={id}
                    ref={ref}
                    className={`px-3 py-2 rounded-lg bg-transparent text-white outline-none  w-full ${className}`}
                >
                    {options?.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </fieldset>
        </div>
    );
}

export default forwardRef(Select)
