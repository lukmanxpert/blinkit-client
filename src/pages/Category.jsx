import React, { useState } from 'react'
import UploadCategoryModal from '../components/UploadCategoryModal'
import { useEffect } from 'react'
import axiosToastError from '../utils/AxiosToastError'
import Loading from '../components/Loading'
import NoData from '../components/NoData'
import Axios from '../utils/Axios'
import summaryApi from '../common/summaryApi'

const Category = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false)
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
  console.log(categoryData);
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
      <div className='p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2'>
        {
          categoryData.map((category, index) => {
            return <div key={index} className='w-32 h-48 rounded shadow-md'>
              <img className='w-full p-2' src={category.image} alt={category.name} />
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
    </div>
  )
}

export default Category