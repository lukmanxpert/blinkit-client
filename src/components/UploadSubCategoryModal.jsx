import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";

const UploadSubCategoryModal = ({ close }) => {
    const [subCategoryData, setSubCategoryData] = useState({
        name: "",
        image: "",
        category: []
    })
    // onchange handler
    const handleChange = (event) => {
        const { name, value } = event.target
        setSubCategoryData((prev) => ({ ...prev, [name]: value }))
    }
    // handleUploadSubCategoryImage
    const handleUploadSubCategoryImage = (event) => {
        
    }
    return (
        <section className='fixed top-0 left-0 right-0 bottom-0 bg-neutral-700/60 z-50 flex justify-center items-center'>
            <div className='bg-white w-full max-w-5xl p-4'>
                <div className='flex justify-between gap-4'>
                    <h1 className='font-semibold'>Add Sub Category</h1>
                    <button className='hover:scale-125 cursor-pointer transition' title='close the modal' onClick={close}><IoClose size={25} /></button>
                </div>
                <div className='mt-4'>
                    <form>
                        <div className='grid'>
                            <label htmlFor="name" className='font-semibold'>Name:</label>
                            <input className='border px-3 py-1 rounded outline-none focus-within:border-primary-100' value={subCategoryData.name} onChange={handleChange} type="text" name='name' id='name' placeholder='Enter the sub category name' />
                        </div>
                        <div className='flex gap-6 mt-4'>
                            <div className='w-36 min-h-36 bg-blue-100 flex justify-center items-center text-neutral-400'>
                                {
                                    subCategoryData.image ? <img src={subCategoryData.image} alt="" /> : "No mage"
                                }
                            </div>
                            <div>
                                <button className='border-2 cursor-pointer border-primary-100 px-3 py-1 rounded hover:bg-primary-100 transition' type='button'><label htmlFor="image" className='font-semibold'>Upload Photo</label></button>
                                <input className='hidden' value={subCategoryData.image} onChange={handleUploadSubCategoryImage} type="file" name='image' id='image' />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default UploadSubCategoryModal;