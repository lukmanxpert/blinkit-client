import { Outlet } from 'react-router'
import Nav from './components/Nav'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'

function App() {

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
