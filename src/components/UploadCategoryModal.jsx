import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/uploadImage';
import Axios from '../utils/Axios';
import summaryApi from '../common/summaryApi';
import { toast } from 'react-hot-toast'
import axiosToastError from '../utils/AxiosToastError';

const UploadCategoryModal = ({ close, fetchCategory }) => {

  const [loading, setLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [data, setData] = useState({
    name: "",
    image: ""
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleUploadCategoryImage = async (e) => {
    const file = e.target.files[0]
    if (!file) {
      return
    }
    setLoading(true)
    const response = await uploadImage(file)
    const { data: imageResponse } = response
    if (!imageResponse?.data?.url) {
      setLoading(false)
      return toast.error("Something went wrong, Try Again")
    }
    setData(prevData => ({ ...prevData, image: imageResponse.data.url }))
    setLoading(false)
  }
  const validateValue = Object.values(data).every(el => el)
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      setSubmitLoading(true)
      const response = await Axios({
        ...summaryApi.add_category,
        data: data
      })
      const { data: responseData } = response
      if (responseData.success) {
        toast.success(responseData.message)
        fetchCategory()
        close()
      }
    } catch (error) {
      axiosToastError(error)
    } finally {
      setSubmitLoading(false)
    }
  }
  return (
    <section className='fixed transition top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800/60 flex justify-center items-center'>
      <div className='bg-white max-w-4xl w-full p-4 rounded'>
        <div className='flex justify-between'>
          <h1 className='font-semibold text-lg'>Category</h1>
          <button className='cursor-pointer hover:scale-125 transition' onClick={close}><IoClose size={25} /></button>
        </div>
        <div>
          <form onSubmit={handleSubmit} className='my-2 space-y-4'>
            <div className='flex flex-col gap-1'>
              <label className='font-semibold' htmlFor="name">
                Category Name:
              </label>
              <input autoFocus className='py-1 px-3 border-2 rounded bg-blue-50 focus-within:border-primary-100 outline-none' placeholder='Enter category name' onChange={handleChange} type="text" value={data.name} name="name" id="name" />
            </div>
            <div className='flex gap-4'>
              <div className='w-32 grid place-items-center text-center border-primary-100 border-2 rounded'>
                {data.image ? <img className='w-full h-full object-scale-down' src={data.image} alt="category-image" /> : <p>No Image Selected</p>}
              </div>
              <div>
                <label className={`font-semibold cursor-pointer ${data.name ? "hover:bg-primary-100" : "bg-gray-400 border-none"} border-primary-100 rounded px-3 py-1 border-2 transition`} htmlFor={data.name && "uploadCategoryImage"}>
                  {loading ? "Uploading..." : data.image ? "Change Image" : "Upload Image"}
                </label>
                <input className='hidden' onChange={handleUploadCategoryImage} type="file" name="image" id="uploadCategoryImage" />
              </div>
            </div>
            <div>
              <button disabled={!validateValue} className={`font-semibold bg-gray-500 w-full py-1 px-3 rounded cursor-pointer transition ${validateValue && "bg-primary-100 hover:bg-primary-200"}`}>{submitLoading ? "Submitting..." : "Add Category"}</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default UploadCategoryModal