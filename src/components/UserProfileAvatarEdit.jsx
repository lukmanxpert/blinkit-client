import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import Axios from '../utils/Axios'
import summaryApi from '../common/summaryApi'
import axiosToastError from '../utils/AxiosToastError'
import { updateAvatar } from '../store/userSlice'
import { IoClose } from "react-icons/io5";

const UserProfileAvatarEdit = ({ close }) => {

    const [loading, setLoading] = useState(false)
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const handleUploadAvatarImage = async (e) => {
        const file = e.target.files[0]
        if (!file) {
            return
        }
        const formData = new FormData();
        formData.append("avatar", file)
        try {
            setLoading(true)
            const response = await Axios({
                ...summaryApi.uploadAvatar,
                data: formData
            })
            const { data: responseData } = response
            dispatch(updateAvatar(responseData.data.avatar))
        } catch (error) {
            axiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className='fixed top-0 right-0 left-0 bottom-0 bg-neutral-900/60 p-4 flex items-center justify-center'>
            <div className='bg-white max-w-sm w-full rounded p-4 flex flex-col justify-center items-center'>
                <button onClick={close} className='ml-auto'><IoClose className='hover:text-primary-100 hover:scale-125 transition' size={25} /></button>
                <div className='h-20 w-20 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm'>
                    {user.avatar ? <img className='rounded-full' src={user.avatar} alt={user.name} /> : <FaUserCircle size={50} />}
                </div>
                <form onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="uploadImage">
                        <div className='text-base text-black my-2 cursor-pointer border border-primary-100 py-1 px-3 rounded hover:bg-primary-100 transition'>
                            {loading ? "Uploading..." : "Upload"}
                        </div>
                    </label>
                    <input onChange={handleUploadAvatarImage} type="file" id='uploadImage' className='hidden' />
                </form>
            </div>
        </section>
    )
}

export default UserProfileAvatarEdit