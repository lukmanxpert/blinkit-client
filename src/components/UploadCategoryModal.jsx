import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";


const UploadCategoryModal = ({ close }) => {

  const [data, setData] = useState({
    name: "",
    image: ""
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setData(prevData => ({ ...prevData, [name]: value }))
  }

  return (
    <section className='fixed transition top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800/60 flex justify-center items-center'>
      <div className='bg-white max-w-4xl w-full p-4 rounded'>
        <div className='flex justify-between'>
          <h1 className='font-semibold text-lg'>Category</h1>
          <button className='cursor-pointer hover:scale-125 transition' onClick={close}><IoClose size={25} /></button>
        </div>
        <div>
          <form className='my-2'>
            <div className='flex flex-col gap-1'>
              <label className='font-semibold' htmlFor="name">
                Category Name:
              </label>
              <input className='py-1 px-3 border-2 rounded bg-blue-50 focus-within:border-primary-100 outline-none' placeholder='Enter category name' onChange={handleChange} type="text" value={data.name} name="name" id="name" />
            </div>
            <div>

            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default UploadCategoryModal