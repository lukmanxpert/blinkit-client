import { useEffect, useState } from 'react'
import axiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import summaryApi from '../common/summaryApi'
import Loading from '../components/Loading'
import ProductCartAdmin from '../components/ProductCartAdmin'

const ProductAdmin = () => {
  const [productData, setProductData] = useState([])
  const [page, setPage] = useState(1)
  const [totalPageCount, setTotalPageCount] = useState(1)
  const [loading, setLoading] = useState(false)
  const fetchProductData = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...summaryApi.getProduct,
        data: {
          page: page,
          limit: 12
        }
      })
      const { data: responseData } = response
      if (responseData.success) {
        setTotalPageCount(responseData.totalNoPage)
        setLoading(false)
        setProductData(response.data.data)
      }
    } catch (error) {
      axiosToastError(error)
    } finally {
      setLoading(false)
    }
  }
  const handleNext = () => {
    if (page !== totalPageCount) {
      setPage(prev => prev + 1)
    }
  }
  const handlePrev = () => {
    if (page > totalPageCount) {
      setPage(prev => prev - 1)
    }
  }
  useEffect(() => {
    fetchProductData()
  }, [page])
  console.log('productData :>> ', productData);
  return (
    <section>
      <div className='flex justify-between shadow p-2'>
        <h1 className='font-semibold'>Products</h1>
      </div>
      {
        loading && <Loading />
      }
      <div className='p-4 bg-blue-50'>
        <div className='min-h-[55vh]'>
          <div className='grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6'>
            {
              productData && productData.map((product, index) => {
                return (
                  <ProductCartAdmin data={product} key={index} />
                )
              })
            }
          </div>
        </div>
        <div className='flex justify-end gap-4 my-4'>
          <button onClick={handlePrev} className='border font-semibold border-primary-200 px-4 py-1 hover:bg-primary-200 transition cursor-pointer'>Previous</button>
          <button>{page}/{totalPageCount}</button>
          <button onClick={handleNext} className='border font-semibold border-primary-200 px-4 py-1 hover:bg-primary-200 transition cursor-pointer'>Next</button>
        </div>
      </div>
    </section>
  )
}

export default ProductAdmin