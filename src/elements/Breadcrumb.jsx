import React from 'react'
import { Link } from 'react-router-dom'

const Breadcrumb = () => {
    return (
        <nav className="flex py-3 w-full h-fit px-5 backdrop-blur-sm bg-[rgba(246,244,244,0.06)]" aria-label="Breadcrumb">
            <ol role="list" className="flex w-full items-center space-x-4">
                <li>
                    <div>
                        <a href="#" className="text-gray-400 hover:text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                            </svg>
                            <span className="sr-only">Home</span>
                        </a>
                    </div>
                </li>
                <li >
                    <div className="flex items-center">
                        <svg
                            className="h-5 w-5 flex-shrink-0 text-gray-300"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                        >
                            <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                        </svg>
                        <Link
                            to='/'
                            className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                            DashBoard
                        </Link>
                    </div>
                </li>

            </ol>
        </nav>
    )
}

export default Breadcrumb
