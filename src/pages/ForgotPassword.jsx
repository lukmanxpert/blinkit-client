import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import summaryApi from '../common/summaryApi';
import axiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from "react-router"

const ForgotPassword = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        // apis
        try {
            const response = await Axios({
                ...summaryApi.forgot_password,
                data: formData
            })
            if (response.data.error) {
                return toast.error(response.data.message)
            }
            if (response.data.success) {
                toast.success(response.data.message)
                setFormData({
                    email: ""
                })
                navigate("/otp-verification")
            }
            console.log("Response", response);
        } catch (error) {
            axiosToastError(error)
        }
    }

    const validateValue = Object.values(formData).every(el => el)

    return (
        <div className='bg-white mt-2 flex flex-col gap-2 items-center'>
            <p className='text-2xl capitalize font-bold mt-6'>Forgot Password</p>
            <form onSubmit={handleSubmit} className='grid gap-4 mb-10 w-full px-4 max-w-3xl'>
                <div className='flex flex-col w-full'>
                    <label htmlFor="email" className='font-bold my-1'>Email: </label>
                    <input className='p-2 bg-blue-50 w-full rounded-lg outline-2' id='email' type="email" name='email' placeholder='Write your email' value={formData.email} onChange={handleChange} />
                </div>
                <button disabled={!validateValue} className={`btn ${validateValue ? 'bg-green-700 hover:bg-green-800' : 'bg-gray-500'} text-white font-semibold`} type='submit'>Send Otp</button>
                <div className='text-center'>
                    <p>Already have account ? <Link to={"/login"} className='text-secondary-200 font-bold text-center'>Register</Link></p>
                </div>
            </form>
        </div>
    )
}

export default ForgotPassword