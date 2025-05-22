import React, { useState } from 'react'
import UploadCategoryModal from '../components/UploadCategoryModal'
import { useEffect } from 'react'
import axiosToastError from '../utils/AxiosToastError'
import Loading from '../components/Loading'
import NoData from '../components/NoData'
import Axios from '../utils/Axios'
import summaryApi from '../common/summaryApi'
import EditCategory from '../components/EditCategory'

const Category = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState(null)
  // fetch category
  const [loading, setLoading] = useState(false)
  const [categoryData, setCategoryData] = useState([])
  const fetchCategory = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...summaryApi.getCategory
      })
      const { data: responseData } = response
      if (responseData.success) {
        setCategoryData(responseData.data)
      }
    } catch (error) {
      axiosToastError(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchCategory()
  }, [])
  return (
    <div>
      <div className='flex justify-between shadow p-2'>
        <h1 className='font-semibold'>Category</h1>
        <button onClick={() => setOpenUploadCategory(true)} className='border border-primary-100 px-3 py-1 rounded text-sm hover:bg-primary-100 hover:text-white transition cursor-pointer'>Add Category</button>
      </div>
      {
        !categoryData[0] && !loading && (
          <NoData />
        )
      }
      <div className='p-4 grid place-items-center grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2'>
        {
          categoryData.map((category, index) => {
            return <div key={index} className='w-32 h-56 rounded shadow-md'>
              <img className='w-full p-2' src={category.image} alt={category.name} />
              <div className='transition-all flex justify-between items-center gap-2 px-4'>
                <button className='text-sm bg-green-100 px-2 py-1 rounded hover:bg-green-200 cursor-pointer' onClick={() => {
                  setOpenEdit(true)
                  setEditData(category)
                }}>Edit</button>
                <button className='text-sm bg-red-100 px-2 py-1 rounded hover:bg-red-200 cursor-pointer'>Delete</button>
              </div>
            </div>
          })
        }
      </div>
      {
        loading && (
          <Loading />
        )
      }
      {
        openUploadCategory && <UploadCategoryModal fetchCategory={fetchCategory} close={() => setOpenUploadCategory(false)} />
      }
      {
        openEdit && (
          <EditCategory editData={editData} close={() => setOpenEdit(false)} fetchCategory={fetchCategory} />
        )
      }
    </div>
  )
}

export default Category