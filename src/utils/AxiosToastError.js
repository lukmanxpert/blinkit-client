import toast from "react-hot-toast";

const axiosToastError = (error) => {
  return toast.error(error?.response?.data?.message);
};

export default axiosToastError;
