import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router';
import Axios from '../utils/Axios';
import axiosToastError from '../utils/AxiosToastError';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import summaryApi from '../common/summaryApi';

const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [data, setData] = useState({
        email: "",
        newPassword: "",
        confirmPassword: ""
    })
    const navigate = useNavigate()
    const location = useLocation();

    useEffect(() => {
        if (!(location?.state?.data?.success)) {
            navigate("/")
        }
        if (location?.state?.email) {
            setData((prevData) => ({ ...prevData, email: location.state.email }))
        }
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!(data.newPassword === data.confirmPassword)) {
            return toast.error("New password and confirm new password must be same!")
        } else if (data.newPassword.length < 6) {
            return toast.error("New password must be at least 6 character!")
        }
        // apis
        try {
            const response = await Axios({
                ...summaryApi.reset_password,
                data: data
            })
            if (response.data.error) {
                return toast.error(response.data.message)
            }
            if (response.data.success) {
                toast.success(response.data.message)
                setData({
                    email: "",
                    newPassword: "",
                    confirmPassword: ""
                })
                navigate("/login")
            }
            console.log("Response", response);
        } catch (error) {
            axiosToastError(error)
        }
    }

    const validateValue = Object.values(data).every(el => el)
    return (
        <div className='bg-white mt-2 flex flex-col gap-2 items-center'>
            <p className='text-2xl capitalize font-bold mt-6'>Reset Password</p>
            <form onSubmit={handleSubmit} className='grid gap-4 mb-10 w-full px-4 max-w-3xl'>
                <div className='flex flex-col w-full'>
                    <label htmlFor="newPassword" className='font-bold my-1'>New Password: </label>
                    <div className='relative'>
                        <input className='p-2 bg-blue-50 w-full rounded-lg outline-2' id='newPassword' type={showPassword ? "text" : "password"} name='newPassword' placeholder='Write new password' value={data.newPassword} onChange={handleChange} />
                        <button type='button' onClick={() => setShowPassword(!showPassword)} className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer'>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>
                <div className='flex flex-col w-full'>
                    <label htmlFor="confirmNewPassword" className='font-bold my-1'>Confirm New Password: </label>
                    <div className='relative'>
                        <input className='p-2 bg-blue-50 w-full rounded-lg outline-2' id='confirmNewPassword' type={showConfirmPassword ? "text" : "password"} name='confirmPassword' placeholder='Confirm new password' value={data.confirmPassword} onChange={handleChange} />
                        <button type='button' onClick={() => setShowConfirmPassword(!showConfirmPassword)} className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer'>
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>
                <button disabled={!validateValue} className={`btn ${validateValue ? 'bg-green-700 hover:bg-green-800' : 'bg-gray-500'} text-white font-semibold`} type='submit'>Change Password</button>
                <div className='text-center'>
                    <p>Already have account ? <Link to={"/login"} className='text-secondary-200 font-bold text-center'>Login</Link></p>
                </div>
            </form>
        </div>
    );
};

export default ResetPassword;