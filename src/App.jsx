import { Outlet, useLocation } from 'react-router'
import Nav from './components/Nav'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import fetchUserDetails from './utils/fetchUserDetails'
import { useDispatch } from 'react-redux'
import { setUserDetails } from './store/userSlice'
import axiosToastError from './utils/AxiosToastError'
import summaryApi from './common/summaryApi'
import Axios from './utils/Axios'
import { setAllCategory, setAllSubCategory, setLoadingCategory } from './store/productsSlice'
import GlobalProvider from './provider/GlobalProvider'
import CartMobileLink from './components/CartMobileLink'

function App() {

  const dispatch = useDispatch()
  const location = useLocation()

  const fetchUser = async () => {
    const userData = await fetchUserDetails()
    dispatch(setUserDetails(userData?.data))
  }

  // fetch category
  const fetchCategory = async () => {
    try {
      const response = await Axios({
        ...summaryApi.getCategory
      })
      const { data: responseData } = response
      if (responseData.success) {
        dispatch(setAllCategory(responseData.data))
      }
    } catch (error) {
      axiosToastError(error)
    }
  }

  // fetch category
  const fetchSubCategory = async () => {
    try {
      dispatch(setLoadingCategory(true))
      const response = await Axios({
        ...summaryApi.getSubCategory
      })
      const { data: responseData } = response
      if (responseData.success) {
        dispatch(setAllSubCategory(responseData.data))
      }
    } catch (error) {
      axiosToastError(error)
    } finally {
      dispatch(setLoadingCategory(false))
    }
  }



  useEffect(() => {
    fetchUser()
    fetchCategory()
    fetchSubCategory()
    // fetchCartItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <GlobalProvider>
      <div className='sticky top-0 left-0 z-50'>
        <Nav />
      </div>
      <section className='min-h-screen container mx-auto'>
        <Outlet></Outlet>
      </section>
      <Footer />
      <Toaster />
      {
        location.pathname !== "/checkout" && <CartMobileLink />
      }
    </GlobalProvider>
  )
}

export default App
