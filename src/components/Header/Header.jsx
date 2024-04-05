import React, { useState } from 'react'
import { Button, Container, Logo, LogoutBtn } from '..'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Header = ({ className = '' }) => {

    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate();

    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: "Log In",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Sign Up",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ]

    const [open, setOpen] = useState(false);

    const toggleMenu = () => {
        setOpen(!open);
    }

    return (
        <header className={`flex w-full z-10 text-white backdrop-blur-sm bg-[rgba(246,244,244,0.09)] ${className}`}>
            <div className="flex w-full max-w-7xl mx-auto">
                <Container >
                    <nav className="grid grid-cols-2 py-3 w-full ">
                        <div className="flex items-center w-full">
                            <Link to='/'>
                                <Logo />
                            </Link>
                        </div>
                        <div className="flex w-full">
                            <ul className='flex ml-auto gap-5'>
                                {navItems.map((item) =>
                                    item.active ? (
                                        <li key={item.name}>
                                            <button
                                                onClick={() => navigate(item.slug)}
                                                className='flex px-7 py-2 transition-all text-lg font-bold hover:backdrop-blur-sm hover:bg-[rgba(246,244,244,0.1)] rounded-md'
                                            >
                                                {item.name}
                                            </button>
                                        </li>
                                    ) : null
                                )}
                                {authStatus && (
                                    <li>
                                        <LogoutBtn />
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div className="flex lg:hidden w-full items-center justify-end">
                            <Button onClick={toggleMenu} className='p-3'>
                                <span className='flex w-fit h-fit my-auto'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
                                        <path fill-rule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
                                    </svg>
                                </span>
                            </Button>
                            <div className={`flex flex-col w-full py-2 px-5 absolute h-screen top-0 left-0 right-0 bg-black ${open ? 'block' : 'hidden'}`}>
                                <div className="flex w-full justify-end">
                                    <Button onClick={toggleMenu} className='p-3 '>
                                        <span className='flex w-fit h-fit my-auto'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
                                                <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                            </svg>
                                        </span>
                                    </Button>
                                </div>
                                <div className="flex w-full h-full">
                                    <ul className='flex flex-col w-full h-full items-center  gap-5'>
                                        {navItems.map((item) =>
                                            item.active ? (
                                                <li key={item.name}>
                                                    <button
                                                        onClick={() => navigate(item.slug)}
                                                        className='flex px-7 py-2 transition-all text-lg font-bold hover:backdrop-blur-sm hover:bg-[rgba(246,244,244,0.1)] rounded-md'
                                                    >
                                                        {item.name}
                                                    </button>
                                                </li>
                                            ) : null
                                        )}
                                        {authStatus && (
                                            <li>
                                                <LogoutBtn />
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>
                </Container>
            </div>
        </header>
    )
}

export default Header