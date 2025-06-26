import { useState } from "react"

const UploadProduct = () => {
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
        <form onSubmit={handleSubmit}>
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
        </form>
      </div>
    </section>
  )
}

export default UploadProduct