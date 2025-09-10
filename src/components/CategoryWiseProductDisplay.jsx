import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import axiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import summaryApi from '../common/summaryApi';
import CardLoading from './CardLoading';
import CardProduct from './CardProduct';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const CategoryWiseProductDisplay = ({ id, name }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const containerRef = useRef()

    // fetch
    const fetchCategoryWiseProducts = async () => {
        try {
            setLoading(true)
            const response = await Axios({
                ...summaryApi.getProductByCategory,
                data: {
                    id: id
                }
            })
            const { data: responseData } = response
            if (responseData.success) {
                setData(responseData.data)
            }
        } catch (error) {
            axiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategoryWiseProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleScrollRight = () => {
        containerRef.current.scrollLeft += 200
    }
    const handleScrollLeft = () => {
        containerRef.current.scrollLeft -= 200
    }

    const loadingCardNumber = new Array(6).fill(null)

    return (
        // <div>
        //     <div className='container mx-auto p-4 flex items-center justify-between gap-4'>
        //         <h3 className='font-semibold text-lg md:text-xl'>{name}</h3>
        //         <Link to={""} className='text-green-600 hover:text-green-400'>See All</Link>
        //     </div>
        //     <div className='flex items-center gap-4 md:gap-6 lg:gap-8 container mx-auto px-4 overflow-x-scroll scrollbar-none scroll-smooth' ref={containerRef}>
        //         {
        //         loading &&
        //             loadingCardNumber.map((_, index) => {
        //                 return <CardLoading key={index} />
        //             })
        //         }
        //         {
        //             data.map((el, index) => {
        //                 return (
        //                     <CardProduct data={el} key={index} />
        //                 )
        //             })
        //         }

        //         <div className='w-full hidden left-0 right-0 container mx-auto px-2 max-w-full absolute lg:flex justify-between'>
        //             <button onClick={handleScrollLeft} className='z-10 relative bg-white hover:bg-gray-100 shadow-lg p-2 rounded-full text-base cursor-pointer'>
        //                 <FaAngleLeft />
        //             </button>
        //             <button onClick={handleScrollRight} className='z-10 relative bg-white hover:bg-gray-100 shadow-lg p-2 rounded-full text-base cursor-pointer'>
        //                 <FaAngleRight />
        //             </button>
        //         </div>

        //     </div>
        // </div>
        <div>
            <div className='container mx-auto p-4 flex items-center justify-between gap-4'>
                <h3 className='font-semibold text-lg md:text-xl'>{name}</h3>
                <Link to={""} className='text-green-600 hover:text-green-400'>See All</Link>
            </div>
            <div className='relative flex items-center '>
                <div className=' flex gap-4 md:gap-6 lg:gap-8 container mx-auto px-4 overflow-x-scroll hide-scrollbar scroll-smooth' ref={containerRef}>
                    {loading &&
                        loadingCardNumber.map((_, index) => {
                            return (
                                <CardLoading key={"CategoryWiseProductDisplay123" + index} />
                            )
                        })
                    }
                    {
                        data.map((p, index) => {
                            return (
                                <CardProduct
                                    data={p}
                                    key={p._id + "CategoryWiseProductDisplay" + index}
                                />
                            )
                        })
                    }
                </div>
                <div className='w-full left-0 right-0 container mx-auto  px-2  absolute hidden lg:flex justify-between'>
                    <button onClick={handleScrollLeft} className='z-10 relative bg-white hover:bg-gray-100 shadow-lg text-lg p-2 rounded-full'>
                        <FaAngleLeft />
                    </button>
                    <button onClick={handleScrollRight} className='z-10 relative  bg-white hover:bg-gray-100 shadow-lg p-2 text-lg rounded-full'>
                        <FaAngleRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CategoryWiseProductDisplay;