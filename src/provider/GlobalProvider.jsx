/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect } from "react";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import { handleAddCartItems } from "../store/cartProduct";
import { useDispatch } from "react-redux";
import axiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";

export const globalContext = createContext(null);

export const useGlobalContext = () => useContext(globalContext);

const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();

  const fetchCartItems = async () => {
    try {
      const result = await Axios({
        ...summaryApi.getCartItem,
      });
      const { data: responseData } = result;
      if (responseData.success) {
        dispatch(handleAddCartItems(responseData.data));
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const updateCartItem = async (id, quantity) => {
    try {
      const response = await Axios({
        ...summaryApi.updateCartItemQuantity,
        data: {
          _id: id,
          quantity: quantity
        }
      })
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message)
        fetchCartItems()
      }
    } catch (error) {
      axiosToastError(error)
    }
  }

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <globalContext.Provider
      value={{
        fetchCartItems,
        updateCartItem
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

export default GlobalProvider;
