import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form"
import axiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import toast from "react-hot-toast";

const AddAddress = ({ close }) => {
    const { register, handleSubmit, reset } = useForm()
    const onSubmit = async (data) => {
        console.log('data :>> ', data);
        try {
            const response = await Axios({
                ...summaryApi.createAddress,
                data: {
                    address_line: data.addressLine,
                    city: data.city,
                    state: data.state,
                    country: data.country,
                    pincode: data.pinCode,
                    mobile: data.mobileNo,
                }
            })
            const { data: responseData } = response
            if (responseData.success) {
                toast.success(responseData.message)
                reset()
                if (close) {
                    close()
                }
            }
        } catch (error) {
            axiosToastError(error)
        }
    }
    return (
        <section className='bg-black/70 fixed top-0 left-0 right-0 bottom-0 z-50 h-screen overflow-auto'>
            <div className='bg-white p-4 w-full max-w-lg mt-8 mx-auto rounded'>
                <div className='flex justify-between items-center gap-4'>
                    <h2 className='font-semibold'>Add Address</h2>
                    <button onClick={close} className='hover:text-red-500'>
                        <IoClose size={25} />
                    </button>
                </div>
                <form className='mt-4 grid gap-4' onSubmit={handleSubmit(onSubmit)}>
                    <div className='grid gap-1'>
                        <label htmlFor='addressLine'>Address Line :</label>
                        <input
                            type='text'
                            id='addressLine'
                            className='border bg-blue-50 p-2 rounded'
                            {...register("addressLine", { required: true })}
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='city'>City :</label>
                        <input
                            type='text'
                            id='city'
                            className='border bg-blue-50 p-2 rounded'
                            {...register("city", { required: true })}
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='state'>State :</label>
                        <input
                            type='text'
                            id='state'
                            className='border bg-blue-50 p-2 rounded'
                            {...register("state", { required: true })}
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='pinCode'>Pincode :</label>
                        <input
                            type='text'
                            id='pinCode'
                            className='border bg-blue-50 p-2 rounded'
                            {...register("pinCode", { required: true })}
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='country'>Country :</label>
                        <input
                            type='text'
                            id='country'
                            className='border bg-blue-50 p-2 rounded'
                            {...register("country", { required: true })}
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='mobile'>Mobile No. :</label>
                        <input
                            type='text'
                            id='mobile'
                            className='border bg-blue-50 p-2 rounded'
                            {...register("mobileNo", { required: true })}
                        />
                    </div>

                    <button type='submit' className='bg-primary-200 w-full  py-2 font-semibold mt-4 hover:bg-primary-100 cursor-pointer'>Submit</button>
                </form>
            </div>
        </section>
    )
}

export default AddAddress