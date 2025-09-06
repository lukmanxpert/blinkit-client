import React, { useEffect, useState } from 'react';
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

    const loadingCardNumber = new Array(6).fill(null)

    return (
        <div>
            <div className='container mx-auto p-4 flex items-center justify-between gap-4'>
                <h3 className='font-semibold text-lg md:text-xl'>{name}</h3>
                <Link to={""} className='text-green-600 hover:text-green-400'>See All</Link>
            </div>
            <div className='flex items-center gap-4 md:gap-6 lg:gap-8 container mx-auto px-4 overflow-hidden'>
                {loading &&
                    loadingCardNumber.map((_, index) => {
                        return <CardLoading key={index} />
                    })
                }
                {
                    data.map((el, index) => {
                        return (
                            <CardProduct data={el} key={index} />
                        )
                    })
                }

                <div className='w-full hidden left-0 right-0 container mx-auto px-2 max-w-full absolute lg:flex justify-between'>
                    <button className='z-10 relative bg-white hover:bg-gray-100 shadow-lg p-4 rounded-full text-lg'>
                        <FaAngleLeft />
                    </button>
                    <button className='z-10 relative bg-white hover:bg-gray-100 shadow-lg p-4 rounded-full text-lg'>
                        <FaAngleRight />
                    </button>
                </div>

            </div>
        </div>
    );
};

export default CategoryWiseProductDisplay;