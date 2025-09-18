import { useState } from "react";
import { useGlobalContext } from "../provider/GlobalProvider";
import { displayPriceInTaka } from "../utils/DisplayPriceInTaka";
import AddAddress from "../components/AddAddress";
import { useSelector } from "react-redux";
import axiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router"

const CheckOutPage = () => {
    const { notDiscountTotalPrice, totalPrice, totalQuantity, fetchCartItems } = useGlobalContext()
    const [openAddress, setOpenAddress] = useState(false)
    const addressList = useSelector(state => state.addresses.addressList)
    const [selectAddress, setSelectAddress] = useState(0)
    const cartItemList = useSelector(state => state.cartItems.cart)
    const navigate = useNavigate()
    const handleCashOnDelivery = async () => {
        try {
            const response = await Axios({
                ...summaryApi.cashOnDeliveryOrder,
                data: {
                    list_items: cartItemList,
                    addressId: addressList[selectAddress]?._id,
                    subTotalAmt: totalPrice,
                    totalAmt: totalPrice
                }
            })
            const { data: responseData } = response
            if (responseData.success) {
                toast.success(responseData.message)
                if (fetchCartItems) {
                    fetchCartItems()
                }
                navigate("/success", {
                    state: {
                        text: "Order"
                    }
                })
            }
        } catch (error) {
            axiosToastError(error)
        }
    }
    return (
        <section className='bg-blue-50'>
            <div className='container mx-auto p-4 flex flex-col lg:flex-row w-full gap-5 justify-between'>
                {/***address***/}
                <div className='w-full'>
                    <h3 className='text-lg font-semibold'>Choose your address</h3>
                    <div className='bg-white p-2 grid gap-4'>
                        {
                            addressList?.map((address, index) => {
                                return (
                                    <label key={index} htmlFor={"address" + index} className={!address.status && "hidden"}>
                                        <div className='border rounded p-3 flex gap-3 hover:bg-blue-50'>
                                            <div>
                                                <input id={"address" + index} type='radio' value={index} onChange={(e) => setSelectAddress(e.target.value)} name='address' />
                                            </div>
                                            <div>
                                                <p>{address.address_line}</p>
                                                <p>{address.city}</p>
                                                <p>{address.state}</p>
                                                <p>{address.country} - {address.pincode}</p>
                                                <p>0{address.mobile}</p>
                                            </div>
                                        </div>
                                    </label>
                                )
                            })
                        }
                        <div onClick={() => setOpenAddress(true)} className='h-16 bg-blue-50 border-2 border-dashed flex justify-center items-center cursor-pointer'>
                            Add address
                        </div>
                    </div>
                </div>

                {/**summary**/}
                <div className='w-full max-w-md bg-white py-4 px-2'>
                    <h3 className='text-lg font-semibold'>Summary</h3>
                    <div className='bg-white p-4'>
                        <h3 className='font-semibold'>Bill details</h3>
                        <div className='flex gap-4 justify-between ml-1'>
                            <p>Items total</p>
                            <p className='flex items-center gap-2'><span className='line-through text-neutral-400'>{displayPriceInTaka(notDiscountTotalPrice)}</span><span>{displayPriceInTaka(totalPrice)}</span></p>
                        </div>
                        <div className='flex gap-4 justify-between ml-1'>
                            <p>Quantity total</p>
                            <p className='flex items-center gap-2'>{totalQuantity} item</p>
                        </div>
                        <div className='flex gap-4 justify-between ml-1'>
                            <p>Delivery Charge</p>
                            <p className='flex items-center gap-2'>Free</p>
                        </div>
                        <div className='font-semibold flex items-center justify-between gap-4'>
                            <p >Grand total</p>
                            <p>{displayPriceInTaka(totalPrice)}</p>
                        </div>
                    </div>
                    <div className='w-full flex flex-col gap-4'>
                        <button className='py-2 px-4 bg-green-600 hover:bg-green-700 rounded text-white font-semibold cursor-pointer'>Online Payment</button>
                        <button onClick={handleCashOnDelivery} className='py-2 px-4 border-2 border-green-600 font-semibold text-green-600 hover:bg-green-600 hover:text-white cursor-pointer'>Cash on Delivery</button>
                    </div>
                </div>
            </div>
            {
                openAddress && (
                    <AddAddress close={() => setOpenAddress(false)} />
                )
            }
        </section>
    );
};

export default CheckOutPage;