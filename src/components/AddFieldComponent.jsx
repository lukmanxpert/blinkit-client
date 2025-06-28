import React from 'react';
import { IoClose } from 'react-icons/io5';

const AddFieldComponent = ({ close, value, onchange, submit }) => {
    return (
        <section className='fixed top-0 left-0 right-0 bottom-0 bg-neutral-900/70 z-50 flex justify-center items-center p-4'>
            <div className='bg-white rounded p-4 w-full max-w-md'>
                <div className='flex items-center justify-between gap-3'>
                    <h1 className='font-semibold'>Add Filed</h1>
                    <button onClick={close} title='close' className='cursor-pointer hover:text-red-600 hover:scale-125 transition'><IoClose size={25} /></button>
                </div>
                <input type="text" name="" id="" value={value} onChange={onchange} placeholder='Enter field name'
                    className='bg-blue-50 my-3 p-2 border outline-none focus-within:border-primary-100 rounded w-full'
                />
                <button onClick={submit} className="bg-primary-100 text-center rounded hover:bg-transparent hover:shadow shadow-primary-100 py-1 px-2 transition cursor-pointer font-semibold">
                    Add Field
                </button>
            </div>
        </section>
    );
};

export default AddFieldComponent;