import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router'
import Divider from './Divider'

const UserMenu = () => {
    const user = useSelector((state) => state.user)
    return (
        <div className='text-neutral-800'>
            <h1 className='font-semibold'>My Account</h1>
            <p>{user?.name || user?.number}</p>

            <Divider />

            <div className='flex flex-col gap-2'>
                <Link>My Order</Link>
                <Link>Save Order</Link>
                <button className='text-left text-red-600 font-semibold'>Log Out</button>
            </div>
        </div>
    )
}

export default UserMenu