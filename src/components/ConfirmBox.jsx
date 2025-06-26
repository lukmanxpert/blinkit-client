import React from 'react'
import { IoClose } from "react-icons/io5";

const ConfirmBox = ({ confirm, cancel, close }) => {
    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-50 bg-neutral-700/60 flex justify-center items-center'>
            <div className='max-w-md w-full bg-white p-4 rounded'>
                <div className='flex justify-between items-center gap-4'>
                    <h1 className='font-semibold'>Permanent Delete</h1>
                    <IoClose onClick={close} className='hover:scale-125 cursor-pointer transition' title='close the modal' size={25} />
                </div>
                <div className='mt-4'>
                    <p>Are you sure to permanent delete?</p>
                    <div className='flex mt-2 justify-end items-center gap-4'>
                        <button className='px-3 py-1 rounded border cursor-pointer border-red-500 text-red-500 hover:text-white hover:bg-red-500 transition' onClick={cancel}>Cancel</button>
                        <button className='px-3 py-1 rounded border cursor-pointer border-green-500 text-green-500 hover:text-white hover:bg-green-500 transition' onClick={confirm}>Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmBox