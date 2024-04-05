import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'
import authService from '../../appwrite/auth'
import { useNavigate } from 'react-router-dom'

const LogoutBtn = ({ className }) => {

    const navigate = useNavigate()

    const dispatch = useDispatch();
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
            navigate('/')
        })
    }

    return (
        <button type="Button" onClick={logoutHandler} className={`flex px-5 py-2 transition-all text-base font-bold rounded-md ${className}`}>
            Log Out
        </button>
    )
}

export default LogoutBtn
