import React, { useState } from 'react'
import UploadCategoryModal from '../components/UploadCategoryModal'

const Category = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false)
  return (
    <div>
      <div className='flex justify-between'>
        <h1 className='font-semibold'>Category</h1>
        <button onClick={() => setOpenUploadCategory(true)} className='border border-primary-100 px-3 py-1 rounded text-sm hover:bg-primary-100 hover:text-white transition cursor-pointer'>Add Category</button>
      </div>
      {
        openUploadCategory && <UploadCategoryModal close={() => setOpenUploadCategory(false)} />
      }
    </div>
  )
}

export default Category