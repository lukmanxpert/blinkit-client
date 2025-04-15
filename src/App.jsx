import { Outlet } from 'react-router'
import './App.css'
import Nav from './components/Nav'
import Footer from './components/Footer'

function App() {

  return (
    <div>
      <Nav />
      <section className='min-h-screen container mx-auto'>
        <Outlet></Outlet>
      </section>
      <Footer />
    </div>
  )
}

export default App
