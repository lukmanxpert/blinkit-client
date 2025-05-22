import React from 'react'
import noDataImage from "../assets/nothing here yet.webp"

const NoData = () => {
    return (
        <div className='flex flex-col justify-center items-center gap-2 p-4'>
            <img className='max-w-36' src={noDataImage} alt="no data" />
            <p className='text-neutral-500'>No data found!</p>
        </div>
    )
}

export default NoData