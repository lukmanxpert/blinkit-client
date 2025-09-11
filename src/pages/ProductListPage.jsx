import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router"
import Axios from "../utils/Axios"
import summaryApi from "../common/summaryApi"
import axiosToastError from "../utils/AxiosToastError"
import Loading from "../components/Loading"
import CardProduct from "../components/CardProduct"
import { validUrlConvert } from "../utils/validUrlConvert"

const ProductListPage = () => {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [totalPage, setTotalPage] = useState(1)
    const params = useParams()
    const AllSubCategory = useSelector(state => state.products.allSubCategory)
    const [DisplaySubCategory, setDisplaySubCategory] = useState([])

    const subCategory = params?.subCategory?.split("-")
    const subCategoryName = subCategory?.slice(0, subCategory?.length - 1)?.join(" ")

    const categoryId = params.category.split("-").slice(-1)[0]
    const subCategoryId = params.subCategory.split("-").slice(-1)[0]


    const fetchProductData = async () => {
        try {
            setLoading(true)
            const response = await Axios({
                ...summaryApi.getProductByCategoryAndSubCategory,
                data: {
                    categoryId: categoryId,
                    subCategoryId: subCategoryId,
                    page: page,
                    limit: 10,
                }
            })

            const { data: responseData } = response

            if (responseData.success) {
                if (responseData.page == 1) {
                    setData(responseData.data)
                } else {
                    setData([...data, ...responseData.data])
                }
                setTotalPage(responseData.totalCount)
            }
        } catch (error) {
            axiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProductData()
    }, [params])


    useEffect(() => {
        const sub = AllSubCategory.filter(s => {
            const filterData = s.category.some(el => {
                return el._id == categoryId
            })

            return filterData ? filterData : null
        })
        setDisplaySubCategory(sub)
    }, [params, AllSubCategory])
    return (
        <section className='sticky top-24 lg:top-20'>
            <div className='grid grid-cols-12'>
                {/**sub category **/}
                <div className='overflow-y-scroll h-screen scrollbarCustom col-span-2 md:col-span-2 shadow-md bg-white py-2'>
                    {
                        DisplaySubCategory.map((s, index) => {
                            const link = `/${validUrlConvert(s?.category[0]?.name)}-${s?.category[0]?._id}/${validUrlConvert(s.name)}-${s._id}`
                            return (
                                <Link to={link} key={index} className={`flex items-center p-2 hover:bg-green-100 cursor-pointer
                  ${subCategoryId === s._id ? "bg-green-100" : ""}
                `}
                                >
                                    <div className='w-fit max-w-28 mx-auto lg:mx-0 bg-white rounded  box-border' >
                                        <img
                                            src={s.image}
                                            alt='subCategory'
                                            className=' w-14 lg:h-14 lg:w-12 h-full object-scale-down'
                                        />
                                    </div>
                                    <p className='-mt-6 lg:mt-0 text-xs hidden md:block text-center lg:text-left lg:text-base'>{s.name}</p>
                                </Link>
                            )
                        })
                    }
                </div>
                {/**Product **/}
                <div className='sticky top-20 col-span-10 md:col-span-10'>
                    <div className='bg-white shadow-md p-4 z-10'>
                        <h3 className='font-semibold'>{subCategoryName}</h3>
                    </div>
                    <div>

                        <div className='min-h-[80vh] max-h-[80vh] overflow-y-auto relative'>
                            <div className=' grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4 '>
                                {
                                    data.map((p, index) => {
                                        return (
                                            <CardProduct
                                                data={p}
                                                key={p._id + "productSubCategory" + index}
                                            />
                                        )
                                    })
                                }
                            </div>
                        </div>

                        {
                            loading && (
                                <Loading />
                            )
                        }

                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductListPage