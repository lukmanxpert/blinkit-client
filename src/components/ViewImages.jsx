import { IoClose } from 'react-icons/io5'

const ViewImages = ({ img, close }) => {
    return (
        <div className='fixed top-0 right-0 bottom-0 left-0 bg-neutral-700/70 flex justify-center items-center z-50'>
            <div className='w-full max-w-md m-4 p-4 bg-white max-h-[80vh]'>
                <IoClose size={25} className='inline-block float-right hover:scale-125 transition cursor-pointer' onClick={() => close()} />
                <img src={img} alt="full image" className='w-full h-full object-scale-down' />
            </div>
        </div>
    )
}

export default ViewImages