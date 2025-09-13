import { useState } from "react";
import EditProductAdmin from "./EditProductAdmin";

const ProductCartAdmin = ({ data, fetchProductData }) => {
    const [editOpen, setEditOpen] = useState(false)
    return (
        <div className="w-36 p-4 bg-white rounded">
            <div>
                <img src={data.image[0]} alt="data.name" className="w-full h-full object-scale-down" />
            </div>
            <p className="text-ellipsis line-clamp-2 font-medium">{data?.name}</p>
            <p className="text-slate-400">{data?.unit}</p>
            <div className="grid grid-cols-2 gap-3 py-2">
                <button onClick={() => setEditOpen(true)} className="border  p-1 text-sm border-green-600 bg-green-100 text-green-800 hover:bg-green-200 rounded cursor-pointer">Edit</button>
                <button className="border  p-1 text-sm border-red-600 bg-red-100 text-red-800 hover:bg-green-200 rounded cursor-pointer">Delete</button>
            </div>
            {
                editOpen && <EditProductAdmin data={data} close={() => setEditOpen(false)} fetchProductData={fetchProductData} />
            }
        </div>
    );
};

export default ProductCartAdmin;