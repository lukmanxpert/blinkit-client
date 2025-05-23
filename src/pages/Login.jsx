import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Axios from '../utils/Axios';
import summaryApi from '../common/summaryApi';
import axiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from "react-router"
import fetchUserDetails from '../utils/fetchUserDetails';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    // apis
    try {
      const response = await Axios({
        ...summaryApi.login,
        data: { email, password }
      })
      if (response.data.error) {
        return toast.error(response.data.message)
      }
      if (response.data.success) {
        toast.success(response.data.message)
        localStorage.setItem("accessToken", response.data.data.accessToken)
        localStorage.setItem("refreshToken", response.data.data.refreshToken)
        
        const userDetails = await fetchUserDetails()
        dispatch(setUserDetails(userDetails.data))

        setFormData({
          email: "",
          password: ""
        })
        navigate("/")
      }
      console.log("Response", response);
    } catch (error) {
      axiosToastError(error)
    }
  }

  const validateValue = Object.values(formData).every(el => el)

  return (
    <div className='bg-white mt-2 flex flex-col gap-2 items-center'>
      <p className='text-2xl capitalize font-bold mt-6'>Login to Binkey<span className='text-green-600'>it</span></p>
      <form onSubmit={handleSubmit} className='grid gap-4 mb-10 w-full px-4 max-w-3xl'>
        <div className='flex flex-col w-full'>
          <label htmlFor="email" className='font-bold my-1'>Email: </label>
          <input className='p-2 bg-blue-50 w-full rounded-lg outline-2' id='email' type="email" name='email' placeholder='Write your email' value={formData.email} onChange={handleChange} />
        </div>
        <div className='flex flex-col w-full'>
          <label htmlFor="password" className='font-bold my-1'>Password: </label>
          <div className='relative'>
            <input className='p-2 bg-blue-50 w-full rounded-lg outline-2' id='password' type={showPassword ? "text" : "password"} name='password' placeholder='Write your password' value={formData.password} onChange={handleChange} />
            <button type='button' onClick={() => setShowPassword(!showPassword)} className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer'>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <Link to={"/forgot-password"} className='mt-1 block ml-auto hover:text-primary-100'>Forgot password?</Link>
        </div>
        <button disabled={!validateValue} className={`btn ${validateValue ? 'bg-green-700 hover:bg-green-800' : 'bg-gray-500'} text-white font-semibold`} type='submit'>Login</button>
        <div className='text-center'>
          <p>Don't have any account ? <Link to={"/register"} className='text-secondary-200 font-bold text-center'>Register</Link></p>
        </div>
      </form>
    </div>
  )
}

export default Login