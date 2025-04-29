import { Outlet } from 'react-router'
import Nav from './components/Nav'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import fetchUserDetails from './utils/fetchUserDetails'
import { useDispatch } from 'react-redux'
import { setUserDetails } from './store/userSlice'

function App() {

  const dispatch = useDispatch()

  const fetchUser = async () => {
    const userData = await fetchUserDetails()
    dispatch(setUserDetails(userData?.data))
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <div>
      <Nav />
      <section className='min-h-screen container mx-auto'>
        <Outlet></Outlet>
      </section>
      <Footer />
      <Toaster />
    </div>
  )
}

export default App
