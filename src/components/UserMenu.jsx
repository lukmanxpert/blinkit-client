import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router'
import Divider from './Divider'
import { logOut } from '../store/userSlice'
import Axios from '../utils/Axios'
import summaryApi from '../common/summaryApi'
import toast from 'react-hot-toast'
import axiosToastError from '../utils/AxiosToastError'
import { FaExternalLinkAlt } from "react-icons/fa";
import useIsAdmin from '../hooks/useIsAdmin'


const UserMenu = ({ closeModal }) => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogOut = async () => {
        try {
            const response = await Axios({
                ...summaryApi.logOut
            })
            if (response.data.success) {
                if (closeModal) {
                    closeModal()
                }
                dispatch(logOut())
                localStorage.clear()
                toast.success(response.data.message)
                navigate("/")
            }
        } catch (error) {
            axiosToastError(error)
        }
    }

    const handleClose = () => {
        if (closeModal) {
            closeModal()
        }
    }

    return (
        <div className='text-neutral-800'>
            <h1 className='font-semibold'>My Account</h1>
            <div className='flex gap-2 items-center'>
                <p>{user?.name || user?.number}</p>
                <span className='text-sm font-semibold text-red-500'>{user?.role === "ADMIN" ? "(Admin)" : ""}</span>
                <Link onClick={handleClose} to={"/dashboard/profile"}>
                    <FaExternalLinkAlt size={15} className='hover:text-primary-100 transition' />
                </Link>
            </div>

            <Divider />

            <div className='flex flex-col gap-2'>
                {
                    useIsAdmin(user.role) && (
                        <>
                            <Link onClick={handleClose} to={"/dashboard/category"} className='hover:bg-primary-100 transition p-1 rounded'>Category</Link>
                            <Link onClick={handleClose} to={"/dashboard/sub-category"} className='hover:bg-primary-100 transition p-1 rounded'>Sub Category</Link>
                            <Link onClick={handleClose} to={"/dashboard/upload-product"} className='hover:bg-primary-100 transition p-1 rounded'>Upload Product</Link>
                            <Link onClick={handleClose} to={"/dashboard/product"} className='hover:bg-primary-100 transition p-1 rounded'>Product</Link>
                        </>
                    )
                }
                <Link onClick={handleClose} to={"/dashboard/my-orders"} className='hover:bg-primary-100 transition p-1 rounded'>My Order</Link>
                <Link onClick={handleClose} to={"/dashboard/address"} className='hover:bg-primary-100 transition p-1 rounded'>Save Address</Link>
                <button onClick={handleLogOut} className='cursor-pointer text-left text-red-600 font-semibold hover:bg-primary-100 transition p-1 rounded'>Log Out</button>
            </div>
        </div>
    )
}

export default UserMenu