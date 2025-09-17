import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import toast from "react-hot-toast";
import axiosToastError from "../utils/AxiosToastError";
import Loading from "./Loading";
import { useGlobalContext } from "../provider/GlobalProvider";

const AddToCartButton = ({ data }) => {
    const { fetchCartItems, updateCartItem, deleteCartItem } = useGlobalContext()
    const [loading, setLoading] = useState(false)
    const cartItem = useSelector(state => state.cartItems.cart)
    const [isAvailableCart, setIsAvailableCart] = useState(false)
    const [quantity, setQuantity] = useState(0)
    const [cartItemDetails, setCartItemsDetails] = useState()

    const handleADDToCart = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        try {
            setLoading(true)
            const response = await Axios({
                ...summaryApi.addToCart,
                data: {
                    productId: data?._id
                }
            })

            const { data: responseData } = response

            if (responseData.success) {
                toast.success(responseData.message)
                if (fetchCartItems) {
                    fetchCartItems()
                }
            }
        } catch (error) {
            axiosToastError(error)
        } finally {
            setLoading(false)
        }

    }

    //checking this item in cart or not
    useEffect(() => {
        const checkingItem = cartItem.some(item => item.productId._id === data._id)
        setIsAvailableCart(checkingItem)
        const product = cartItem.find(item => item.productId._id === data._id)
        setQuantity(product?.quantity)
        setCartItemsDetails(product)
    }, [data, cartItem])


    const increaseQty = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        updateCartItem(cartItemDetails?._id, quantity + 1, true)
        fetchCartItems()
    }

    const decreaseQty = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (quantity === 1) {
            deleteCartItem(cartItemDetails?._id)
        } else {
            updateCartItem(cartItemDetails?._id, quantity - 1, false)
        }
    }

    return (
        <div className='w-full max-w-[150px]'>
            {
                isAvailableCart ? (
                    <div className='flex w-full h-full'>
                        <button onClick={decreaseQty} className='bg-green-600 hover:bg-green-700 text-white flex-1 w-full p-1 rounded flex items-center justify-center cursor-pointer'><FaMinus /></button>

                        <p className='flex-1 w-full font-semibold px-1 flex items-center justify-center'>{quantity}</p>

                        <button onClick={increaseQty} className='bg-green-600 hover:bg-green-700 text-white flex-1 w-full p-1 rounded flex items-center justify-center cursor-pointer'><FaPlus /></button>
                    </div>
                ) : (
                    <button onClick={handleADDToCart} className='bg-green-600 hover:bg-green-700 text-white px-2 lg:px-4 py-1 rounded'>
                        {loading ? <Loading /> : "Add"}
                    </button>
                )
            }
        </div>
    )
}

export default AddToCartButton