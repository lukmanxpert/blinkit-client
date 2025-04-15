import React from 'react'
import logo from "../assets/logo.png"
import { FaSearch } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation';

const Nav = () => {
  return (
    <header className='h-20 flex justify-between items-center shadow sticky top-0'>
      <div className='container mx-auto flex justify-between items-center'>
        {/* logo */}
        <div>
          <img width={170} height={60} src={logo} alt="blinkIt logo" />
        </div>
        {/* search */}
        <div>
          <div className='flex justify-start items-center gap-4 p-2 border border-neutral-300 text-neutral-600 rounded-lg w-[300px] md:w-[400px]'>
            <button className='cursor-pointer'>
              <FaSearch />
            </button>
            <div>
              <TypeAnimation
                sequence={[
                  'Search "Milk"',
                  1000,
                  'Search "Bread"',
                  1000,
                  'Search "Sugar"',
                  1000,
                  'Search "Chocolate"',
                  1000,
                  'Search "Egg"',
                  1000,
                  'Search "Oil"',
                  1000,
                  'Search "Noodles"',
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>
          </div>
        </div>
        {/* login and cart */}
        <div>
          <p>Login And My Cart</p>
        </div>
      </div>
    </header>
  )
}

export default Nav