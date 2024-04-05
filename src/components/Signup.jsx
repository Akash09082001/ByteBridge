import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Container, Input } from './index.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { AuthHeading } from '../elements'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login(userData));
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
                    <div className="flex flex-col w-full h-fit max-w-sm px-8 py-10 backdrop-blur-sm bg-[rgba(246,244,244,0.1)] p-5 gap-10 rounded-2xl">
                        <AuthHeading text='Sign Up' className='text-center w-full text-white' />
                        <div className="flex flex-col gap-5 w-full">
                            <form onSubmit={handleSubmit(create)} className='flex flex-col gap-8
                             w-full'>
                                <div className="grid grid-cols-1 w-full gap-3">
                                    <Input
                                        label="Full Name : "
                                        placeholder="Enter your full name"
                                        {...register("name", {
                                            required: true,
                                        })}
                                    />
                                    <Input
                                        label="Email : "
                                        placeholder="Enter your email"
                                        type="email"
                                        {...register("email", {
                                            required: true,
                                            validate: {
                                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                                    "Email address must be a valid address",
                                            }
                                        })}
                                    />
                                    <Input
                                        label="Password : "
                                        type="password"
                                        placeholder="Enter your password"
                                        {...register("password", {
                                            required: true,
                                        })}
                                    />
                                    {error && <p className="text-red-600 text-center">{error}</p>}
                                </div>
                                <Button
                                    type='submit'
                                    className='w-full text-center items-center justify-center text-base text-white py-2 bg-purple-600' >
                                    Create Account
                                </Button>
                            </form>

                            <div className="flex w-full">
                                <span className='text-center items-center justify-center w-full text-gray-400'>
                                    Already have an account&nbsp;?&nbsp;
                                    <Link to='/login' className='w-full hover:text-blue-400 hover:underline'>
                                        Log In
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

export default Signup