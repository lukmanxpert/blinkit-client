import React, { useState } from 'react'
import AddSubCategoryModal from '../components/AddSubCategoryModal'

const SubCategory = () => {
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false)
  return (
    <section>
      <div className='flex justify-between shadow p-2'>
        <h1 className='font-semibold'>Sub Category</h1>
        <button onClick={()=>{
          setOpenAddSubCategory(true)
        }} className='border border-primary-100 px-3 py-1 rounded text-sm hover:bg-primary-100 hover:text-white transition cursor-pointer'>Add Sub Category</button>
      </div>
      {
        openAddSubCategory && (
          <AddSubCategoryModal close={()=>setOpenAddSubCategory(false)} />
        )
      }
    </section>
  )
}

export default SubCategory