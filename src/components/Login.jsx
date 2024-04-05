import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Container, Input } from "."
import { useDispatch } from "react-redux"
import authService from "../appwrite/auth"
import { useForm } from "react-hook-form"
import { AuthHeading } from '../elements'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <section
            className='flex items-center justify-center w-full max-w-7xl mx-auto'>
            <Container className='h-screen grid grid-cols-1 w-full'>
                <div className="flex w-full h-screen items-center justify-center md:justify-end">
                    <div className="flex flex-col w-full h-fit sm:max-w-sm px-8 py-10 backdrop-blur-sm bg-[rgba(246,244,244,0.1)] p-5 gap-8 rounded-2xl">
                        <AuthHeading text='Log In' className='text-center w-full text-white' />
                        <div className="flex flex-col gap-5 w-full">
                            <form onSubmit={handleSubmit(login)} className='flex flex-col gap-8
                             w-full'>
                                <div className="grid grid-cols-1 w-full gap-3">
                                    <Input
                                        label="Email :"
                                        placeholder="Enter your Email"
                                        type="email"
                                        {...register("email", {
                                            required: true,
                                            validate: {
                                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                                    "Enter Valid Email Id",
                                            }
                                        })}
                                    />
                                    <Input
                                        label="Password :"
                                        placeholder="Enter your Password"
                                        type="password"
                                        {...register("password", {
                                            required: true,
                                        })}
                                    />
                                    {error && <p className="text-red-600 text-center">{error}</p>}
                                </div>
                                <Button
                                    type='submit'
                                    className='w-full text-center items-center justify-center text-base text-white py-2 bg-purple-600' >
                                    Log In
                                </Button>
                            </form>
                            <div className="flex w-full">
                                <span className='text-center items-center justify-center w-full text-gray-400'>
                                    Don&apos;t have any account&nbsp;?&nbsp;
                                    <Link to='/signup' className='w-full hover:text-blue-400 hover:underline'>
                                        Sign Up
                                    </Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default Login