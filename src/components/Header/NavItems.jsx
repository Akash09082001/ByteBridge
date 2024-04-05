import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '../../constant/Icons/HomeIcon';
import BlogsIcon from '../../constant/Icons/BlogsIcon';
import AddBlogIcons from '../../constant/Icons/AddBlogIcons';


const NavItems = () => {

    const authStatus = useSelector((state) => state.auth.status)

    const navigate = useNavigate();

    const navItems = [
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
            name: "Home",
            slug: "/",
            active: authStatus,
            logo: <HomeIcon className='group-hover:text-purple-600' />
        },
        {
            name: "All Blogs",
            slug: "/all-posts",
            active: authStatus,
            logo: <BlogsIcon className='group-hover:text-purple-600' />
        },
        {
            name: "Add Blog",
            slug: "/add-post",
            active: authStatus,
            logo: <AddBlogIcons className='group-hover:text-purple-600' />
        },
    ]

    return (
        <div className='flex w-full'>
            <ul className='flex flex-col w-full h-full gap-2 text-white'>
                {navItems.map((item) =>
                    item.active ? (
                        <li key={item.name} className='flex w-full'>
                            <button
                                onClick={() => navigate(item.slug)}
                                className='flex py-3 md:py-2 px-4 gap-3 w-full items-center justify-center md:items-start md:justify-start transition-all text-base font-semibold group hover:text-purple-600 hover:backdrop-blur-sm hover:bg-[rgba(246,244,244,0.1)] rounded-md'
                            >
                                <span className='h-5 w-5 flex text-white'>
                                    {item.logo}
                                </span>
                                <span className='hidden md:flex'>{item.name}</span>
                            </button>
                        </li>
                    ) : null
                )}

            </ul>
        </div>
    )
}

export default NavItems
