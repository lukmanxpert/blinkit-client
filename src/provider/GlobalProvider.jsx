/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import { handleAddCartItems } from "../store/cartProduct";
import { useDispatch, useSelector } from "react-redux";
import axiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { priceWithDiscount } from "../utils/priceWithDiscount";

export const globalContext = createContext(null);

export const useGlobalContext = () => useContext(globalContext);

const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQuantity, setTotalQuantity] = useState(0)
  const [notDiscountTotalPrice, setNotDiscountPrice] = useState(0)
  const cartItems = useSelector(state => state.cartItems.cart)
  const user = useSelector(state => state.user)

  // fetch cart items
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

  // update cart items
  const updateCartItem = async (id, quantity, type) => {
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
        // toast.success(responseData.message)
        if (type === true) {
          toast.success("Item added")
        }
        if (type === false) {
          toast.success("Item removed")
        }
        fetchCartItems()
      }
    } catch (error) {
      axiosToastError(error)
    }
  }

  // delete cart items
  const deleteCartItem = async (cartId) => {
    try {
      const response = await Axios({
        ...summaryApi.deleteCartItem,
        data: {
          _id: cartId
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

  const handleLogOut = () => {
    localStorage.clear()
    dispatch(handleAddCartItems([]))
  }

  useEffect(() => {
    const totalQuantity = cartItems.reduce((prev, curr) => {
      return prev + curr.quantity
    }, 0)
    setTotalQuantity(totalQuantity)
    const tPrice = cartItems.reduce((prev, curr) => {
      return prev + (priceWithDiscount(curr.productId.price, curr.productId.discount) * curr.quantity)
    }, 0)
    setTotalPrice(tPrice)
    const notDiscountTotalPrice = cartItems.reduce((prev, curr) => {
      return prev + (curr?.productId?.price * curr.quantity)
    }, 0)
    setNotDiscountPrice(notDiscountTotalPrice)
  }, [cartItems])

  useEffect(() => {
    fetchCartItems()
    handleLogOut()
  }, [user])

  return (
    <globalContext.Provider
      value={{
        fetchCartItems,
        updateCartItem,
        deleteCartItem,
        totalPrice,
        totalQuantity,
        notDiscountTotalPrice
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

export default GlobalProvider;
