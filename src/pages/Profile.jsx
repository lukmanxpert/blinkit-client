import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FaUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from '../components/UserProfileAvatarEdit';


const Profile = () => {
    const user = useSelector((state) => state.user)
    const [openProfileAvatarEdit, setOpenAvatarEdit] = useState(false)
    return (
        <div>
            <div className='flex flex-col w-20 justify-center'>
                <div className='h-20 w-20'>
                    {user.avatar ? <img className='rounded-full' src={user.avatar} alt={user.name} /> : <FaUserCircle size={50} />}
                </div>
                <button onClick={() => setOpenAvatarEdit(true)} className='text-base my-2 cursor-pointer hover:text-primary-100 transition'>Change</button>
                {
                    openProfileAvatarEdit && (
                        <UserProfileAvatarEdit close={() => setOpenAvatarEdit(false)} />
                    )
                }
            </div>
        </div>
    )
}

export default Profile