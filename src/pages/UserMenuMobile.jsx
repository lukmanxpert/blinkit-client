import React from 'react'
import UserMenu from '../components/UserMenu'
import { IoClose } from "react-icons/io5";

const UserMenuMobile = () => {
    return (
        <section>
            <div className='container mx-auto bg-white p-4 pb-20'>
                <div className='flex justify-end'>
                    <IoClose onClick={() => window.history.back()} size={25} className='cursor-pointer hover:scale-125 transition' />
                </div>
                <UserMenu />
            </div>
        </section>
    )
}

export default UserMenuMobile