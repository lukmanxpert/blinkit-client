import React from 'react'
import logo from "../assets/logo.png"

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

        </div>
        {/* login and cart */}
        <div>

        </div>
      </div>
    </header>
  )
}

export default Nav