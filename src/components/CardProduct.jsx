import React from 'react';
import { displayPriceInTaka } from '../utils/DisplayPriceInTaka';

const CardProduct = ({ data }) => {
    return (
        <div className='grid gap-3 p-4 max-w-52 lg:min-w-52 rounded'>
            <div className='min-h-20 max-h-32 bg-blue-50 rounded'>
                <img src={data.image[0]} className='w-full h-full object-scale-down scale-125' />
            </div>
            <div className='rounded text-sm w-fit p-[1px] px-2 text-green-600 bg-green-50'>
                10 mnt
            </div>
            <div className='font-medium text-ellipsis line-clamp-2'>
                {data.name}
            </div>
            <div className='w-fit'>
                {data.unit}
            </div>
            <div className='flex items-center justify-between gap-3'>
                <div className='font-semibold'>
                    {displayPriceInTaka(data.price)}
                </div>
                <div className='bg-green-600 hover:bg-green-700 text-white px-4'>
                    <button>Add</button>
                </div>
            </div>
        </div>
    );
};

export default CardProduct;