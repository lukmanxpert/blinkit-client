import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router'
import Divider from './Divider'
import { logOut } from '../store/userSlice'
import Axios from '../utils/Axios'
import summaryApi from '../common/summaryApi'
import toast from 'react-hot-toast'
import axiosToastError from '../utils/AxiosToastError'

const UserMenu = ({ closeModal }) => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const handleLogOut = async () => {
        try {
            const response = await Axios({
                ...summaryApi.logOut
            })
            if (response.data.success) {
                closeModal()
                dispatch(logOut())
                localStorage.clear()
                toast.success(response.data.message)
            }
        } catch (error) {
            axiosToastError(error)
        }
    }

    return (
        <div className='text-neutral-800'>
            <h1 className='font-semibold'>My Account</h1>
            <p>{user?.name || user?.number}</p>

            <Divider />

            <div className='flex flex-col gap-2'>
                <Link className='hover:bg-primary-100 transition p-1 rounded'>My Order</Link>
                <Link className='hover:bg-primary-100 transition p-1 rounded'>Save Order</Link>
                <button onClick={handleLogOut} className='cursor-pointer text-left text-red-600 font-semibold hover:bg-primary-100 transition p-1 rounded'>Log Out</button>
            </div>
        </div>
    )
}

export default UserMenu