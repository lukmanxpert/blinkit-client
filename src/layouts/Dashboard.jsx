import React from 'react'
import { Outlet } from 'react-router'
import UserMenu from '../components/UserMenu'
import { useSelector } from 'react-redux'

const Dashboard = () => {
    const user = useSelector(state => state.user)
    console.log(user);
    return (
        <section className='bg-white'>
            <div className='container mx-auto p-3 flex'>
                <div className='py-4 sticky top-24 max-h-[calc(100vh-96px)] overflow-y-auto hidden lg:block w-[250px] border-r'>
                    <UserMenu />
                </div>
                <div className='bg-white p-4 grow min-h-[80vh]'>
                    <Outlet></Outlet>
                </div>
            </div>
        </section>
    )
}

export default Dashboard