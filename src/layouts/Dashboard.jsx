import React from 'react'
import { Outlet } from 'react-router'
import UserMenu from '../components/UserMenu'

const Dashboard = () => {
    return (
        <section className='bg-white'>
            <div className='container mx-auto p-3 flex'>
                <div className='py-4 sticky top-24 overflow-y-auto hidden lg:block w-[250px]'>
                    <UserMenu />
                </div>
                <div className='bg-white p-4 grow'>
                    <Outlet></Outlet>
                </div>
            </div>
        </section>
    )
}

export default Dashboard