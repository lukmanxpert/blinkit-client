import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/uploadImage';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { MdDeleteForever } from "react-icons/md";
import Axios from '../utils/Axios';
import summaryApi from '../common/summaryApi';
import axiosToastError from '../utils/AxiosToastError';

const UploadSubCategoryModal = ({ close, refetch }) => {
    const [loading, setLoading] = useState(false)
    const [subCategoryData, setSubCategoryData] = useState({
        name: "",
        image: "",
        category: []
    })

    const allCategory = useSelector(state => state.products.allCategory)
    // onchange handler
    const handleChange = (event) => {
        const { name, value } = event.target
        setSubCategoryData((prev) => ({ ...prev, [name]: value }))
    }
    // handleUploadSubCategoryImage
    const handleUploadSubCategoryImage = async (event) => {
        const file = event.target.files[0]
        if (!file) {
            return
        }
        setLoading(true)
        const response = await uploadImage(file)
        const { data: imageResponse } = response
        if (!imageResponse?.data?.url) {
            setLoading(false)
            return toast.error("Something went wrong, Try Again")
        }
        setSubCategoryData(prevData => ({ ...prevData, image: imageResponse.data.url }))
        setLoading(false)
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await Axios({
                ...summaryApi.addSubCategory,
                data: subCategoryData
            })
            const { data: responseData } = response
            if (responseData.success) {
                toast.success(responseData.message)
                if (refetch) {
                    refetch()
                }
                if (close) {
                    close()
                }
            }
        } catch (error) {
            axiosToastError(error)
        }
    }
    return (
        <section className='fixed top-0 left-0 right-0 bottom-0 bg-neutral-700/60 z-50 flex justify-center items-center'>
            <div className='bg-white w-full max-w-5xl p-4 m-4'>
                <div className='flex justify-between gap-4'>
                    <h1 className='font-semibold text-xl'>Add Sub Category</h1>
                    <button className='hover:scale-125 cursor-pointer transition' title='close the modal' onClick={close}><IoClose size={25} /></button>
                </div>
                <div className='mt-4'>
                    <form onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label htmlFor="name" className='font-semibold'>Name:</label>
                            <input className='border px-3 py-1 rounded outline-none focus-within:border-primary-100' value={subCategoryData.name} onChange={handleChange} type="text" name='name' id='name' placeholder='Enter the sub category name' />
                        </div>
                        <div className='flex gap-6 mt-4'>
                            <div className='w-36 min-h-36 border-2 border-primary-100 rounded flex justify-center items-center text-neutral-400'>
                                {
                                    subCategoryData.image ? <img src={subCategoryData.image} alt="" /> : <p>No image</p>
                                }
                            </div>
                            <div>
                                <button className='border-2 cursor-pointer border-primary-100 px-3 py-1 rounded hover:bg-primary-100 transition' type='button'><label htmlFor="image" className='font-semibold cursor-pointer'>{loading ? "Uploading" : subCategoryData.image ? "Change Image" : "Upload Image"}</label></button>
                                <input className='hidden' onChange={handleUploadSubCategoryImage} type="file" name='image' id='image' />
                            </div>
                        </div>
                        <div>
                            {
                                subCategoryData.category.length > 0 ? (
                                    <div className='mt-4'>
                                        <h2 className='font-semibold'>Selected Categories:</h2>
                                        <ul className='list-disc pl-5'>
                                            {
                                                subCategoryData.category.map((category) => (
                                                    <div className='flex items-center gap-2' key={category._id}>
                                                        <li key={category._id} className='text-primary-100'>{category.name}</li>
                                                        <button type='button' className='text-red-500 cursor-pointer hover:scale-125 transition' onClick={() => {
                                                            setSubCategoryData((prev) => ({
                                                                ...prev,
                                                                category: prev.category.filter(el => el._id !== category._id)
                                                            }));
                                                        }}><MdDeleteForever size={20} /></button>
                                                    </div>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                ) : <p className='text-neutral-500 mt-4'>No categories selected</p>
                            }
                        </div>
                        <div className='mt-4'>
                            <select className='w-full p-2 bg-transparent outline-none border border-primary-100 rounded cursor-pointer'
                                onChange={(e) => {
                                    const value = e.target.value
                                    const categoryDetails = allCategory.find(el => el._id == value)
                                    setSubCategoryData((prev) => ({ ...prev, category: [...prev.category, categoryDetails] }));
                                }}>
                                <option disabled selected value={""}>Select Category</option>{
                                    allCategory.map((category) => {
                                        return (
                                            <option value={category?._id} key={category._id + "subcategory"}>{category?.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='flex justify-center items-center'>
                            <button className={`py-2 px-3 my-2 cursor-pointer font-semibold rounded w-full ${subCategoryData.name && subCategoryData.image && subCategoryData.category[0] ? "bg-primary-100" : "bg-gray-500"}`}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default UploadSubCategoryModal;