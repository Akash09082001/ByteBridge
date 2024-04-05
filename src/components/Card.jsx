import React, { useRef, useState } from 'react'

const Card = ({ imageUrl, title, className = '' }) => {

    const [isCursorVisible, setIsCursorVisible] = useState(false);
    const cursorRef = useRef(null);
    const containerRef = useRef(null);

    const handleMouseMove = (e) => {
        const containerRect = containerRef.current.getBoundingClientRect();
        const offsetX = e.clientX - containerRect.left;
        const offsetY = e.clientY - containerRect.top;
        cursorRef.current.style.transition = "transform .1s ease-in-out";
        cursorRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    };

    const handleMouseEnter = () => {
        setIsCursorVisible(true);
    };

    const handleMouseLeave = () => {
        setIsCursorVisible(false);
    };

    return (

        <div ref={containerRef} onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
            class="relative flex h-56 w-full transition-all hover:border-2 hover:border-purple-600 overflow-hidden rounded-md">
            {isCursorVisible &&
                <span ref={cursorRef} class="absolute flex size-20 rounded-full bg-purple-800 blur-2xl shadow-2xl shadow-purple-500"></span>
            }
            <div class="flex flex-col h-full w-full rounded-md justify-between bg-white bg-opacity-10 backdrop-blur p-4">
                <div className="flex w-full h-40 rounded-md bg-white">
                    <img src={imageUrl} alt={title}
                        className={`rounded-md flex w-full h-full object-cover ${className}`} />
                </div>
                <div className="flex w-full">
                    <strong>{title}</strong>
                </div>
            </div>
        </div>

    )
}

export default Card
