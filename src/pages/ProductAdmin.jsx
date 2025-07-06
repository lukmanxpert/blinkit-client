import React, { useEffect, useState } from 'react'
import axiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import summaryApi from '../common/summaryApi'

const ProductAdmin = () => {
  const [productData, setProductData] = useState([])
  const [page, setPage] = useState(1)
  const fetchProductData = async () => {
    try {
      const response = await Axios({
        ...summaryApi.getProduct,
        data: {
          page: page,
        }
      })
      const { data: responseData } = response
      if (responseData.success) {
        setProductData(response.data)
      }
      console.log('responseData :>> ', responseData);
    } catch (error) {
      axiosToastError(error)
    }
  }
  useEffect(() => {
    fetchProductData()
  }, [])
  return (
    <div>ProductAdmin</div>
  )
}

export default ProductAdmin