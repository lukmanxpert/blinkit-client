import React, { useEffect, useState } from 'react'
import UploadSubCategoryModal from '../components/UploadSubCategoryModal'
import axiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import summaryApi from '../common/summaryApi'
import DisplayTable from '../components/DisplayTable'
import { createColumnHelper } from "@tanstack/react-table"
import ViewImages from '../components/ViewImages'

const SubCategory = () => {
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false)
  const [subCategoryData, setSubCategoryData] = useState([])
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const columnHelper = createColumnHelper()
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
  // column helper
  const column = [
    columnHelper.accessor('name', {
      header: "Name"
    }),
    columnHelper.accessor('image', {
      header: "Image",
      cell: ({ row }) => {
        return <div className='flex justify-center items-center cursor-pointer'>
          <img onClick={() => setImageUrl(row.original.image)} src={row.original.image} alt={row.original.name} className='w-8 h-8' />
        </div>
      }
    }),
    columnHelper.accessor('category', {
      header: "Category"
    }),
  ]
  console.log("image url", imageUrl);
  return (
    <section>
      <div className='flex justify-between shadow p-2'>
        <h1 className='font-semibold'>Sub Category</h1>
        <button onClick={() => {
          setOpenAddSubCategory(true)
        }} className='border-2 font-semibold border-primary-100 px-3 py-1 rounded text-sm hover:bg-primary-100 hover:text-white transition cursor-pointer'>Add Sub Category</button>
      </div>
      <div>
        <DisplayTable data={subCategoryData} column={column} />
      </div>
      {
        openAddSubCategory && (
          <UploadSubCategoryModal close={() => setOpenAddSubCategory(false)} />
        )
      }{
        imageUrl && <ViewImages img={imageUrl} close={() => setImageUrl("")} />
      }
    </section>
  )
}

export default SubCategory