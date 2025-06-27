import { useState } from "react"
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../utils/uploadImage";
import toast from "react-hot-toast";

const UploadProduct = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {}
  })
  // onchange handler
  const handleChange = (event) => {
    const { name, value } = event.target
    setData((prev) => ({ ...prev, [name]: value }))
  }
  // imageUploadHandler
  const handleUploadImage = async (event) => {
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
    setData(prevData => ({ ...prevData, image: [...prevData.image, imageResponse.data.url] }))
    setLoading(false)
  }
  // submit handler
  const handleSubmit = async (event) => {
    event.preventDefault()
  }
  return (
    <section>
      <div className='flex justify-between shadow p-2'>
        <h1 className='font-semibold'>Upload Products</h1>
      </div>
      <div className="grid py-3">
        <form onSubmit={handleSubmit} className="grid gap-2">
          {/* name */}
          <div className="grid gap-1">
            <label htmlFor="name" className="font-semibold">Name</label>
            <input type="text"
              name="name"
              id="name"
              placeholder="Enter Product Name"
              value={data.name}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border-2 focus-within:border-primary-100 rounded"
            />
          </div>
          {/* description */}
          <div className="grid gap-1">
            <label htmlFor="description" className="font-semibold">Description</label>
            <textarea type="text"
              name="description"
              id="description"
              placeholder="Enter Product Description"
              value={data.description}
              onChange={handleChange}
              required
              rows={3}
              className="bg-blue-50 p-2 outline-none border-2 focus-within:border-primary-100 rounded resize-none"
            />
          </div>
          {/* upload images */}
          <div>
            <p>Image</p>
            <label htmlFor="image" className="bg-blue-50 h-24 border-2 rounded flex justify-center items-center cursor-pointer">
              <div className="text-center flex flex-col justify-center items-center">
                <FaCloudUploadAlt size={25} />
                <p>Upload Image</p>
              </div>
              <input onChange={handleUploadImage} accept="image/*" className="hidden" type="file" name="image" id="image" />
            </label>
            {/* display upload image */}
            <div>
              {
                data.image.map((img, index) => {
                  return (
                    <div key={index} className="h-20 w-20 min-w-20 bg-blue-50 border">
                      <img src={img} alt="productImage" className="w-full h-full object-scale-down" />
                    </div>
                  )
                })
              }
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default UploadProduct