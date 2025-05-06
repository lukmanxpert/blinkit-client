import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/uploadImage';


const UploadCategoryModal = ({ close }) => {

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
    const response = await uploadImage(file)
    const { data: imageResponse } = response
    console.log(imageResponse.data.url);
    setData(prevData => ({ ...prevData, image: imageResponse.data.url }))
  }
  console.log(data);
  return (
    <section className='fixed transition top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800/60 flex justify-center items-center'>
      <div className='bg-white max-w-4xl w-full p-4 rounded'>
        <div className='flex justify-between'>
          <h1 className='font-semibold text-lg'>Category</h1>
          <button className='cursor-pointer hover:scale-125 transition' onClick={close}><IoClose size={25} /></button>
        </div>
        <div>
          <form className='my-2 space-y-4'>
            <div className='flex flex-col gap-1'>
              <label className='font-semibold' htmlFor="name">
                Category Name:
              </label>
              <input className='py-1 px-3 border-2 rounded bg-blue-50 focus-within:border-primary-100 outline-none' placeholder='Enter category name' onChange={handleChange} type="text" value={data.name} name="name" id="name" />
            </div>
            <div className='flex gap-4'>
              <div className='w-32 h-32 grid place-items-center text-center border-primary-100 border-2 rounded'>
                {data.image ? <img className='w-full h-full object-scale-down' src={data.image} alt="category-image" /> : <p>No Image Selected</p>}
              </div>
              <div>
                <label className='font-semibold cursor-pointer border-primary-100 rounded px-3 py-1 border-2 hover:bg-primary-100 transition' htmlFor="uploadCategoryImage">
                  Upload Image
                </label>
                <input className='hidden' onChange={handleUploadCategoryImage} type="file" name="image" id="uploadCategoryImage" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default UploadCategoryModal