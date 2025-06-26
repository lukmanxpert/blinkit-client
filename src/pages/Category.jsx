import React, { useState } from 'react'
import UploadCategoryModal from '../components/UploadCategoryModal'
import { useEffect } from 'react'
import axiosToastError from '../utils/AxiosToastError'
import Loading from '../components/Loading'
import NoData from '../components/NoData'
import Axios from '../utils/Axios'
import summaryApi from '../common/summaryApi'
import EditCategory from '../components/EditCategory'
import ConfirmBox from '../components/ConfirmBox'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

const Category = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState(null)
  const [openDelete, setOpenDelete] = useState(false)
  const [categoryDeleteID, setCategoryDeleteID] = useState({
    _id: ""
  })
  // fetch category
  // const [loading, setLoading] = useState(false)
  const [categoryData, setCategoryData] = useState([])
  const allCategory = useSelector(state => state.products.allCategory)
  useEffect(() => {
    setCategoryData(allCategory)
  }, [allCategory])
  // handle delete function
  const handleDeleteProduct = async () => {
    try {
      const response = await Axios({
        ...summaryApi.deleteCategory,
        data: categoryDeleteID
      })
      const { data } = response
      if (data.success) {
        toast.success(data.message)
        setOpenDelete(false)
      }
    } catch (error) {
      axiosToastError(error)
    }
  }
  return (
    <section>
      <div className='flex justify-between shadow p-2'>
        <h1 className='font-semibold'>Category</h1>
        <button onClick={() => setOpenUploadCategory(true)} className='border border-primary-100 px-3 py-1 rounded text-sm hover:bg-primary-100 hover:text-white transition cursor-pointer'>Add Category</button>
      </div>
      {
        !categoryData[0] && (
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
                <button className='text-sm bg-red-100 px-2 py-1 rounded hover:bg-red-200 cursor-pointer' onClick={() => {
                  setOpenDelete(true)
                  setCategoryDeleteID(category)
                }}>Delete</button>
              </div>
            </div>
          })
        }
      </div>
      {/* {
        loading && (
          <Loading />
        )
      } */}
      {
        openUploadCategory && <UploadCategoryModal close={() => setOpenUploadCategory(false)} />
      }
      {
        openEdit && (
          <EditCategory editData={editData} close={() => setOpenEdit(false)} />
        )
      }
      {
        openDelete && (
          <ConfirmBox confirm={handleDeleteProduct} cancel={() => setOpenDelete(false)} close={() => setOpenDelete(false)} />
        )
      }
    </section>
  )
}

export default Category