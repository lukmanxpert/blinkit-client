import { createContext, useContext, useEffect } from "react";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import { handleAddCartItems } from "../store/cartProduct";
import { useDispatch } from "react-redux";

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

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <globalContext.Provider
      value={{
        fetchCartItems,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

export default GlobalProvider;
