import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Axios from '../utils/Axios';
import summaryApi from '../common/summaryApi';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    if (password !== confirmPassword) {
      return toast.error("Password and Confirm Password must be same!")
    }
    // apis
    const response = await Axios({
      ...summaryApi.register
    })
  }
  // validate value
  const validateValue = Object.values(formData).every(el => el)
  return (
    <div className='bg-white mt-2 flex flex-col gap-2 items-center'>
      <p className='text-2xl capitalize font-bold mt-6'>Welcome to Binkeyit</p>
      <form onSubmit={handleSubmit} className='grid gap-4 mb-10 w-full px-4 max-w-3xl'>
        <div className='flex flex-col w-full'>
          <label htmlFor="name" className='font-bold my-1'>Name: </label>
          <input className='p-2 bg-blue-50 w-full rounded-lg outline-2' id='name' type="text" name='name' autoFocus placeholder='Write your name' value={formData.name} onChange={handleChange} />
        </div>
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
        </div>
        <div className='flex flex-col w-full'>
          <label htmlFor="confirmPassword" className='font-bold my-1'>Confirm Password: </label>
          <div className='relative'>
            <input className='p-2 bg-blue-50 w-full rounded-lg outline-2' id='confirmPassword' type={showConfirmPassword ? "text" : "password"} name='confirmPassword' placeholder='Confirm Password' value={formData.confirmPassword} onChange={handleChange} />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer'>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <button disabled={!validateValue} className={`btn ${validateValue ? 'bg-green-700 hover:bg-green-800' : 'bg-gray-500'} text-white font-semibold`} type='submit'>Register</button>
      </form>
    </div>
  )
}

export default Register