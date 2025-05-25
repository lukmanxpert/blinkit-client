import { Outlet } from 'react-router'
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
import { setAllCategory } from './store/productsSlice'

function App() {

  const dispatch = useDispatch()

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

  useEffect(() => {
    fetchUser()
    fetchCategory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className='sticky top-0 left-0 z-50'>
        <Nav />
      </div>
      <section className='min-h-screen container mx-auto'>
        <Outlet></Outlet>
      </section>
      <Footer />
      <Toaster />
    </div>
  )
}

export default App
