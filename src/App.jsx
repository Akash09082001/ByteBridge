import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Footer, Header } from './components/index'
import { Outlet } from 'react-router-dom'

function App() {

    const [loading, setLoading] = useState(true)
    const authStatus = useSelector((state) => state.auth.status)

    const dispatch = useDispatch()

    useEffect(() => {
        authService.getCurrentUser()
            .then((userData) => {
                if (userData) {
                    dispatch(login({ userData }));
                }
                else {
                    dispatch(logout())
                }
            })
            .catch((error) => {
                console.log("Authservice wouldn't getCurrentUser", error);
            })
            .finally(() => setLoading(false))
    }, [])

    return !loading ? (
        <div className="flex relative w-full h-screen">
            <div className="relative isolate flex h-full w-full overflow-hidden bg-neutral-950">
                <svg class="absolute inset-0 -z-10 h-full w-full stroke-gray-200 dark:stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" aria-hidden="true"><defs><pattern id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse"><path d="M.5 200V.5H200" fill="none"></path></pattern></defs><svg x="50%" y="-1" class="overflow-visible dark:fill-gray-800/20 fill-gray-200/20"><path d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z" stroke-width="0"></path></svg><rect width="100%" height="100%" stroke-width="0" fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"></rect></svg>
                <svg viewBox="0 0 1108 632" aria-hidden="true" class="absolute top-10 left-[calc(50%-4rem)] -z-10 w-[69.25rem] max-w-none transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"><path fill="url(#175c433f-44f6-4d59-93f0-c5c51ad5566d)" fill-opacity=".2" d="M235.233 402.609 57.541 321.573.83 631.05l234.404-228.441 320.018 145.945c-65.036-115.261-134.286-322.756 109.01-230.655C968.382 433.026 1031 651.247 1092.23 459.36c48.98-153.51-34.51-321.107-82.37-385.717L810.952 324.222 648.261.088 235.233 402.609Z"></path><defs><linearGradient id="175c433f-44f6-4d59-93f0-c5c51ad5566d" x1="1220.59" x2="-85.053" y1="432.766" y2="638.714" gradientUnits="userSpaceOnUse"><stop stop-color="#9333ea"></stop><stop offset="1" stop-color="#a855f7"></stop></linearGradient></defs></svg>
                <svg viewBox="0 0 1108 632" aria-hidden="true" class="absolute bottom-10 right-[calc(50%-4rem)] -z-10 w-[69.25rem] max-w-none transform-gpu blur-3xl sm:right-[calc(50%-18rem)] lg:left-48 lg:bottom-[calc(50%-30rem)] xl:right-[calc(50%-24rem)]"><path fill="url(#175c433f-44f6-4d59-93f0-c5c51ad5566d)" fill-opacity=".2" d="M235.233 402.609 57.541 321.573.83 631.05l234.404-228.441 320.018 145.945c-65.036-115.261-134.286-322.756 109.01-230.655C968.382 433.026 1031 651.247 1092.23 459.36c48.98-153.51-34.51-321.107-82.37-385.717L810.952 324.222 648.261.088 235.233 402.609Z"></path><defs><linearGradient id="175c433f-44f6-4d59-93f0-c5c51ad5566d" x1="1220.59" x2="-85.053" y1="432.766" y2="638.714" gradientUnits="userSpaceOnUse"><stop stop-color="#9333ea"></stop><stop offset="1" stop-color="#a855f7"></stop></linearGradient></defs></svg>
            </div>

            <div className="absolute h-full divide-x divide-neutral-950 flex w-full flex-col">

                {!authStatus ? (<Header className='fixed z-10 top-0 left-0' />) : null}

                <main className="flex flex-col w-full h-screen">
                    <Outlet />
                </main>

                {!authStatus ? (<Footer />) : null}

            </div>
        </div>

    ) : null
}

export default App
