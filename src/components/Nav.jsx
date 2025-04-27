import React from 'react'
import logo from "../assets/logo.png"
import Search from './Search'
import { Link, useNavigate } from 'react-router'
import { FaRegUserCircle, FaShoppingCart } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const Nav = () => {
  const navigate = useNavigate();
  const redirectToLogin = () => {
    navigate("/login")
  }
  const user = useSelector((state) => state?.user)
  console.log("user from redux", user);
  return (
    <header className='h-20 flex justify-between items-center shadow sticky top-0 bg-white'>
      <div className='container mx-auto flex justify-between items-center gap-4'>
        {/* logo */}
        <Link to={"/"}>
          <img width={window.innerWidth > 768 ? 170 : 100} height={window.innerWidth > 768 ? 60 : 40} src={logo} alt="blinkIt logo" />
        </Link>
        {/* search */}
        <div>
          <Search />
        </div>
        {/* login and cart */}
        <div className='mr-2 md:hidden md:mr-0 flex items-center'>
          <button>
            <FaRegUserCircle size={25} />
          </button>
        </div>
        <div className='hidden md:flex items-center text-white gap-6'>
          <button onClick={redirectToLogin} className='text-black cursor-pointer font-semibold'>Login</button>
          <button className='flex gap-2 items-center justify-between bg-green-800 p-2 rounded-lg'>
            <FaShoppingCart className='animate-bounce' />
            <p className='font-semibold'>My Cart</p>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Nav