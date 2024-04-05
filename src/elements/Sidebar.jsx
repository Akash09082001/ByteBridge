import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Logo, NavItems } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import LogoutIcon from '../constant/Icons/LogoutIcon'
import { logout } from '../store/authSlice'

const Sidebar = () => {
    const authStatus = useSelector((state) => state.auth.status)

    const navigate = useNavigate()

    const dispatch = useDispatch();
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
            navigate('/')
        })
    }

    return (
        <aside className='flex flex-col divide-y divide-neutral-800 justify-between text-gray-100 h-full w-full'>
            <div className="flex-1 w-full divide-y">
                <div className="flex flex-col w-full  divide-y divide-neutral-800 ">
                    <div className="hidden md:flex w-full px-5 py-3">
                        <Link to="/">
                            <Logo />
                        </Link>
                    </div>
                    <div className="flex w-full py-5 px-1 md:px-5">
                        <NavItems />
                    </div>
                </div>
            </div>
            <div className="flex px-1 md:px-5 py-2">
                {authStatus && (
                    <button onClick={logoutHandler} className="flex py-3 md:py-2 px-5 gap-3 w-full transition-all text-base font-semibold group hover:text-purple-600 hover:backdrop-blur-sm hover:bg-[rgba(246,244,244,0.1)] rounded-md">
                        <span className='h-5 w-5 flex text-white'>
                            <LogoutIcon className='transition-all group-hover:text-purple-600' />
                        </span>
                        <span className='hidden md:flex'>Log Out</span>
                    </button>
                )}
            </div>
        </aside>
    )
}

export default Sidebar
