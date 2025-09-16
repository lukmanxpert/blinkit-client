import React, { useEffect, useState } from 'react'
import logo from "../assets/logo.png"
import Search from './Search'
import { Link, useNavigate } from 'react-router'
import { FaRegUserCircle, FaShoppingCart } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import UserMenu from './UserMenu'
import { displayPriceInTaka } from '../utils/DisplayPriceInTaka'

const Nav = () => {
  const user = useSelector((state) => state?.user)
  const [openUserMenu, setOpenUserMenu] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQuantity, setTotalQuantity] = useState(0)
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cartItems.cart)

  const redirectToLogin = () => {
    navigate("/login")
  }
  const handleCloseUserMenu = () => {
    setOpenUserMenu(false)
  }
  const handleMobileMenu = () => {
    if (!user._id) {
      return navigate("/login")
    }
    if (user._id) {
      navigate("/user-menu")
    }
  }
  // total items and total price
  useEffect(() => {
    const totalQuantity = cartItems.reduce((prev, curr) => {
      return prev + curr.quantity
    }, 0)
    setTotalQuantity(totalQuantity)
    const tPrice = cartItems.reduce((prev, curr) => {
      return prev + (curr.productId.price * curr.quantity)
    }, 0)
    setTotalPrice(tPrice)
  }, [cartItems])

  return (
    <header className='h-16 px-2 flex justify-between items-center shadow sticky top-0 bg-white'>
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
          <button className=''>
            <FaRegUserCircle onClick={handleMobileMenu} size={25} />
          </button>
        </div>
        <div className='hidden md:flex items-center text-white gap-6'>
          {user._id ? <div className='relative'>
            <div onClick={() => setOpenUserMenu(prevState => !prevState)} className='text-black flex justify-center items-center gap-1 cursor-pointer select-none'>
              <p className='font-semibold'>Account</p>
              {
                openUserMenu ? (
                  <GoTriangleUp size={25} />
                ) : (
                  <GoTriangleDown size={25} />
                )
              }
            </div>
            {
              openUserMenu && (
                <div className='absolute right-0 top-12'>
                  <div className='bg-white rounded p-4 min-w-52 lg:shadow-lg'>
                    <UserMenu closeModal={handleCloseUserMenu} />
                  </div>
                </div>
              )
            }
          </div> :
            <button onClick={redirectToLogin} className='text-black cursor-pointer font-semibold'>Login</button>
          }
          <button className='flex gap-2 items-center justify-between bg-green-800 p-2'>
            <FaShoppingCart className='animate-bounce' />
            {
              cartItems[0] ? (
                <div>
                  <p>{totalQuantity} Items</p>
                  <p>{displayPriceInTaka(totalPrice)}</p>
                </div>
              ) : (
                <p className='font-semibold'>My Cart</p>
              )
            }
          </button>
        </div>
      </div>
    </header>
  )
}

export default Nav