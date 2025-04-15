import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className='border-t'>
            <div className='container mx-auto p-4 text-center flex flex-col gap-2 lg:justify-between lg:flex-row'>
                <p className='capitalize'>© all right reserved 2025</p>
                <div className='flex justify-center items-center gap-4 text-2xl'>
                    <a href="#" target='_blank' className='hover:text-primary-100 transition'>
                        <FaFacebook />
                    </a>
                    <a href="#" target='_blank' className='hover:text-primary-100 transition'>
                        <FaInstagram />
                    </a>
                    <a href="#" target='_blank' className='hover:text-primary-100 transition'>
                        <FaLinkedin />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer