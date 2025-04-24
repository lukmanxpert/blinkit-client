import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import summaryApi from '../common/summaryApi';
import axiosToastError from '../utils/AxiosToastError';
import { Link, useLocation, useNavigate } from "react-router"

const OtpVerification = () => {
    const navigate = useNavigate()
    const inputRef = useRef([])
    const location = useLocation()

    useEffect(() => {
        if (!location?.state?.email) {
            navigate("/forgot-password")
        }
    }, [])

    const [formData, setFormData] = useState(["", "", "", "", "", ""])

    const validateValue = formData.every(el => el)

    const handleSubmit = async (event) => {
        event.preventDefault();
        // apis
        try {
            const response = await Axios({
                ...summaryApi.forgot_password_otp_verification,
                data: {
                    otp: formData.join(""),
                    email: location.state?.email
                }
            })
            if (response.data.error) {
                return toast.error(response.data.message)
            }
            if (response.data.success) {
                toast.success(response.data.message)
                setFormData(["", "", "", "", "", ""])
            }
            console.log("Response", response);
        } catch (error) {
            axiosToastError(error)
        }
    }

    return (
        <div className='bg-white mt-2 flex flex-col gap-2 items-center'>
            <p className='text-2xl capitalize font-bold mt-6'>Enter Otp</p>
            <form onSubmit={handleSubmit} className='grid gap-4 mb-10 w-full px-4 max-w-3xl'>
                <div className='flex flex-col w-full'>
                    <label htmlFor="otp" className='font-bold my-1'>Otp: </label>
                    <div className='flex gap-2 justify-between'>
                        {
                            formData.map((el, index) => {
                                return <input key={index}
                                    ref={(ref) => {
                                        inputRef.current[index] = ref
                                        return ref
                                    }}
                                    className='p-2 bg-blue-50 max-w-14 rounded-lg outline-2 text-center' value={formData[index]}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const newFormData = [...formData];
                                        newFormData[index] = value;
                                        setFormData(newFormData)
                                        if (value && index < 5) {
                                            inputRef.current[index + 1].focus()
                                        }
                                    }} maxLength={1} id='otp' type="text" />
                            })
                        }
                    </div>
                </div>
                <button disabled={!validateValue} className={`btn ${validateValue ? 'bg-green-700 hover:bg-green-800' : 'bg-gray-500'} text-white font-semibold`} type='submit'>Send Otp</button>
                <div className='text-center'>
                    <p>Already have account ? <Link to={"/login"} className='text-secondary-200 font-bold text-center'>Register</Link></p>
                </div>
            </form>
        </div>
    )
}

export default OtpVerification