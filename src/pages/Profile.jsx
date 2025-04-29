import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from '../components/UserProfileAvatarEdit';
import axiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import summaryApi from '../common/summaryApi';
import toast from 'react-hot-toast';
import fetchUserDetails from '../utils/fetchUserDetails';
import { setUserDetails } from '../store/userSlice';


const Profile = () => {

    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const [loading, setLoading] = useState(false)
    const [openProfileAvatarEdit, setOpenAvatarEdit] = useState(false)
    const [data, setData] = useState({
        name: user?.name,
        email: user?.email,
        mobile: user?.mobile,
    })

    useEffect(() => {
        setData({
            name: user?.name,
            email: user?.email,
            mobile: user?.mobile,
        })
    }, [user?.email, user?.mobile, user?.name])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevValue) => ({ ...prevValue, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            const response = await Axios({
                ...summaryApi.updateUser,
                data: data
            })
            const { data: responseData } = response
            if (responseData.success) {
                toast.success(responseData.message)
            }
            const userData = await fetchUserDetails()
            dispatch(setUserDetails(userData.data))
        } catch (error) {
            axiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    console.log(data);

    return (
        <div>
            <div className='flex flex-col justify-center'>
                {/* update avatar part */}
                <div className='h-20 w-20 mb-14 flex flex-col items-center'>
                    {user.avatar ? <img className='rounded-full' src={user.avatar} alt={user.name} /> : <FaUserCircle size={50} />}
                    <button onClick={() => setOpenAvatarEdit(true)} className='border-primary-100 border py-1 px-3 my-2 font-bold rounded transition hover:bg-primary-100 hover:text-black cursor-pointer'>Change</button>
                </div>
                {
                    openProfileAvatarEdit && (
                        <UserProfileAvatarEdit close={() => setOpenAvatarEdit(false)} />
                    )
                }
                {/* update name, mobile, email, change password part */}
                <form onSubmit={handleSubmit} className='grid gap-2 w-full'>
                    <div>
                        <label className='font-bold' htmlFor="name">
                            Name:
                        </label>
                        <input required className='border rounded px-2 py-1 focus-within:border-primary-100 w-full' value={data.name} onChange={handleChange} type="text" name="name" id="name" placeholder='Write your name' />
                    </div>
                    <div>
                        <label className='font-bold' htmlFor="email">
                            Email:
                        </label>
                        <input required className='border rounded px-2 py-1 focus-within:border-primary-100 w-full' value={data.email} onChange={handleChange} type="email" name="email" id="email" placeholder='Write your email' />
                    </div>
                    <div>
                        <label className='font-bold' htmlFor="mobile">
                            Mobile:
                        </label>
                        <input required className='border rounded px-2 py-1 focus-within:border-primary-100 w-full' value={data.mobile} onChange={handleChange} type="number" name="mobile" id="mobile" placeholder='Write your mobile number' />
                    </div>
                    <button className='border-primary-100 border p-2 font-bold rounded transition hover:bg-primary-100 hover:text-black cursor-pointer' type='submit'>{loading ? "Loading..." : "Submit"}</button>
                </form>
            </div>
        </div>
    )
}

export default Profile