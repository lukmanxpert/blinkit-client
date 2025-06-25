import React, { useEffect, useState } from 'react'
import UploadSubCategoryModal from '../components/UploadSubCategoryModal'
import axiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import summaryApi from '../common/summaryApi'

const SubCategory = () => {
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false)
  const [subCategoryData, setSubCategoryData] = useState([])
  const [loading, setLoading] = useState(false)
  const fetchSubCategory = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...summaryApi.getSubCategory
      })
      const { data: responseData } = response
      if (responseData.success) {
        setSubCategoryData(responseData.data)
      }
    } catch (error) {
      axiosToastError(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchSubCategory()
  }, [])
  return (
    <section>
      <div className='flex justify-between shadow p-2'>
        <h1 className='font-semibold'>Sub Category</h1>
        <button onClick={() => {
          setOpenAddSubCategory(true)
        }} className='border border-primary-100 px-3 py-1 rounded text-sm hover:bg-primary-100 hover:text-white transition cursor-pointer'>Add Sub Category</button>
      </div>
      {
        openAddSubCategory && (
          <UploadSubCategoryModal close={() => setOpenAddSubCategory(false)} />
        )
      }
    </section>
  )
}

export default SubCategory