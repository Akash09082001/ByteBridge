import React from 'react'
import { AuthHeading } from '../elements'
import { Header1, Sidebar } from '.'

const Dashboard = ({ children, heading }) => {
    return (
        <section class="flex h-screen w-full bg-neutral-950 text-white">
            <div class="grid h-full w-full divide-x divide-neutral-800 grid-cols-6 ">
                <div class="col-span-1 flex h-full w-full">
                    <Sidebar />
                </div>
                <div class="col-span-5 relative flex h-screen flex-col divide-y divide-neutral-800">
                    <div class="hidden md:flex h-fit w-full ">
                        <Header1 />
                    </div>
                    <div class="flex h-full w-full flex-col overflow-x-hidden overflow-y-auto ">
                        <div class="flex h-fit w-full flex-col justify-start">
                            <div className="flex px-5 py-4 w-full sticky z-10 top-0 left-0 backdrop-blur-lg bg-neutral-950">
                                <AuthHeading text={heading} className='text-white text-xl' />
                            </div>
                            <div className="flex w-full px-2 md:px-5">
                                {children}
                            </div>
                        </div>
                    </div>
                    <div class="flex h-fit w-full ">
                        <div className="flex w-full px-5 py-4 backdrop-blur-sm bg-[rgba(246,244,244,0.09)]">
                            <span className='text-base'>All right reserver</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>

    )
}

export default Dashboard


