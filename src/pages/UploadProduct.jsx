import { useState } from "react"
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../utils/uploadImage";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import ViewImages from "../components/ViewImages";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux"
import { IoClose } from "react-icons/io5";
import AddFieldComponent from "../components/AddFieldComponent";
import axiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";

const UploadProduct = () => {
  const [imageLoading, setImageLoading] = useState(false)
  const [openImageUrl, setOpenImageUrl] = useState("")
  const allCategory = useSelector(state => state.products.allCategory)
  const allSubCategory = useSelector(state => state.products.allSubCategory)
  const [selectCategory, setSelectCategory] = useState("")
  const [selectSubCategory, setSelectSubCategory] = useState("")
  const [openAddField, setOpenAddField] = useState(false)
  const [fieldName, setFieldName] = useState("")
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
    setImageLoading(true)
    const response = await uploadImage(file)
    const { data: imageResponse } = response
    if (!imageResponse?.data?.url) {
      setImageLoading(false)
      return toast.error("Something went wrong, Try Again")
    }
    setData(prevData => ({ ...prevData, image: [...prevData.image, imageResponse.data.url] }))
    setImageLoading(false)
  }
  // submit handler
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await Axios({
        ...summaryApi.addProduct,
        data: data
      })
      const { data: responseData } = response
      if (responseData.success) {
        console.log("responseData", responseData);
        setData({
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
        return toast.success(responseData.message)
      }
    } catch (error) {
      return axiosToastError(error)
    }
  }
  // handle delete
  const handleDelete = (index) => {
    data.image.splice(index, 1)
    setData((prev) => ({ ...prev }))
  }
  // handle remove category
  const handleRemoveCategory = (index) => {
    data.category.splice(index, 1)
    setData((prev) => ({ ...prev }))
  }
  // handle remove sub category
  const handleRemoveSubCategory = (index => {
    data.subCategory.splice(index, 1)
    setData((prev) => ({ ...prev }))
  })
  // handle add field
  const handleAddField = () => {
    setData((prev) => ({ ...prev, more_details: { ...prev.more_details, [fieldName]: "" } }))
    setFieldName("")
    setOpenAddField(false)
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
            <label htmlFor="name">Name</label>
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
            <label htmlFor="description">Description</label>
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
                {
                  imageLoading ? <Loading /> : <>
                    <FaCloudUploadAlt size={25} />
                    <p>Upload Image</p>
                  </>
                }
              </div>
              <input onChange={handleUploadImage} required accept="image/*" className="hidden" type="file" name="image" id="image" />
            </label>
            {/* display upload image */}
            <div className="flex flex-wrap gap-2 my-4 group">
              {
                data.image.map((img, index) => {
                  return (
                    <div key={index} className="h-20 w-20 min-w-20 bg-blue-50 border relative">
                      <img onClick={() => setOpenImageUrl(img)} src={img} alt="productImage" className="w-full h-full object-scale-down cursor-pointer" />
                      <MdDelete onClick={() => handleDelete(index)} className="absolute bottom-0 right-0 hidden group-hover:inline-block cursor-pointer bg-red-600 hover:bg-red-700 transition-all rounded text-white p-1" size={25} />
                    </div>
                  )
                })
              }
            </div>
            {
              openImageUrl && <ViewImages img={openImageUrl} close={() => setOpenImageUrl("")} />
            }
          </div>
          {/* category */}
          <div className="grid gap-1">
            <label htmlFor="category">Category</label>
            <div>
              <select name="category" id="category" value={selectCategory} className="bg-blue-50 border w-full p-2 rounded"
                onChange={(e) => {
                  const value = e.target.value
                  const category = allCategory.find(el => el._id === value)
                  setData((prev) => ({ ...prev, category: [...prev.category, category] }))
                  setSelectCategory("")
                }}
              >
                <option value="" selected disabled>Select Category</option>
                {
                  allCategory.map((c, index) => (
                    <option key={index + c._id} value={c._id}>{c.name}</option>
                  ))
                }
              </select>
              <div className="flex flex-wrap gap-3">
                {
                  data.category.map((c, index) => {
                    return (
                      <div key={index + "categories"} className="text-sm flex justify-start items-center gap-1 bg-blue-50 mt-2 rounded shadow">
                        <p>{c.name}</p>
                        <button onClick={() => handleRemoveCategory(index)} type="button" title="delete" className="cursor-pointer hover:text-red-500 transition">
                          <IoClose size={20} />
                        </button>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
          {/* subCategory */}
          <div className="grid gap-1">
            <label htmlFor="category">Sub Category</label>
            <div>
              <select name="category" id="category" value={selectSubCategory} className="bg-blue-50 border w-full p-2 rounded"
                onChange={(e) => {
                  const value = e.target.value
                  const subCategory = allSubCategory.find(el => el._id === value)
                  setData((prev) => ({ ...prev, subCategory: [...prev.subCategory, subCategory] }))
                  setSelectSubCategory("")
                }}
              >
                <option value="" selected disabled>Select Sub Category</option>
                {
                  allSubCategory.map((c, index) => (
                    <option key={index + c._id} value={c._id}>{c.name}</option>
                  ))
                }
              </select>
              <div className="flex flex-wrap gap-3">
                {
                  data.subCategory.map((c, index) => {
                    return (
                      <div key={index + "categories"} className="text-sm flex justify-start items-center gap-1 bg-blue-50 mt-2 rounded shadow">
                        <p>{c.name}</p>
                        <button onClick={() => handleRemoveSubCategory(index)} type="button" title="delete" className="cursor-pointer hover:text-red-500 transition">
                          <IoClose size={20} />
                        </button>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
          {/* unit */}
          <div className="grid gap-1">
            <label htmlFor="unit">Unit</label>
            <input type="text"
              name="unit"
              id="unit"
              placeholder="Enter Product Unit"
              value={data.unit}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border-2 focus-within:border-primary-100 rounded"
            />
          </div>
          {/* stock */}
          <div className="grid gap-1">
            <label htmlFor="stock">Number of Stock</label>
            <input type="number"
              name="stock"
              id="stock"
              placeholder="Enter Product Stock"
              value={data.stock}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border-2 focus-within:border-primary-100 rounded"
            />
          </div>
          {/* price */}
          <div className="grid gap-1">
            <label htmlFor="price">Price</label>
            <input type="number"
              name="price"
              id="price"
              placeholder="Enter Product Price"
              value={data.price}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border-2 focus-within:border-primary-100 rounded"
            />
          </div>
          {/* discount */}
          <div className="grid gap-1">
            <label htmlFor="discount">Discount</label>
            <input type="number"
              name="discount"
              id="discount"
              placeholder="Enter Product Discount"
              value={data.discount}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border-2 focus-within:border-primary-100 rounded"
            />
          </div>
          {/* more field */}
          <div>
            {
              Object?.keys(data?.more_details).map((key, index) => {
                return (
                  <div key={index} className="grid gap-1">
                    <label htmlFor={key}>{key}</label>
                    <input type="text"
                      name="discount"
                      id={key}
                      placeholder="Enter Product Discount"
                      value={data.more_details[key]}
                      onChange={(e) => {
                        const value = e.target.value
                        setData((prev) => {
                          return {
                            ...prev, more_details: {
                              ...prev.more_details, [key]: value
                            }
                          }
                        })
                      }}
                      required
                      className="bg-blue-50 p-2 outline-none border-2 focus-within:border-primary-100 rounded"
                    />
                  </div>
                )
              })
            }
          </div>
          <div onClick={() => setOpenAddField(true)} className="bg-white shadow hover:bg-primary-100 w-24 text-center rounded hover:shadow shadow-primary-100 py-1 px-2 transition cursor-pointer font-semibold">
            Add Field
          </div>
          <div>
            <button className="bg-primary-100 hover:bg-primary-200 w-full py-2 px-3 font-semibold rounded cursor-pointer my-2">Submit</button>
          </div>
        </form>
        {
          openAddField && <AddFieldComponent value={fieldName} onchange={(e) => setFieldName(e.target.value)} submit={handleAddField} close={() => setOpenAddField(false)} />
        }
      </div>
    </section>
  )
}

export default UploadProduct