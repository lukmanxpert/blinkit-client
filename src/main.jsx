import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from "react-router"
import Home from './pages/Home.jsx'
import SearchPage from './pages/SearchPage.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import OtpVerification from './pages/OtpVerification.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import UserMenuMobile from './pages/UserMenuMobile.jsx'
import Dashboard from './layouts/Dashboard.jsx'
import Profile from './pages/Profile.jsx'
import MyOrders from './pages/MyOrders.jsx'
import SaveAddress from './pages/SaveAddress.jsx'
import Category from './pages/Category.jsx'
import SubCategory from './pages/SubCategory.jsx'
import UploadProduct from './pages/UploadProduct.jsx'
import ProductAdmin from './pages/ProductAdmin.jsx'
import AdminPermission from './layouts/AdminPermission.jsx'
import ProductListPage from './pages/ProductListPage.jsx'
import ProductDisplayPage from './pages/ProductDisplayPage.jsx'
import CartMobile from './pages/CartMobile.jsx'
import CheckOutPage from './pages/CheckOutPage.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />}></Route>
          <Route path='/search' element={<SearchPage />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/forgot-password' element={<ForgotPassword />}></Route>
          <Route path='/otp-verification' element={<OtpVerification />}></Route>
          <Route path='/reset-password' element={<ResetPassword />}></Route>
          <Route path='/user-menu' element={<UserMenuMobile />}></Route>
          <Route path='/dashboard' element={<Dashboard />}>
            <Route path='/dashboard/profile' element={<Profile />} />
            <Route path='/dashboard/my-orders' element={<MyOrders />} />
            <Route path='/dashboard/address' element={<SaveAddress />} />
            <Route path='/dashboard/category' element={<AdminPermission><Category /></AdminPermission>} />
            <Route path='/dashboard/sub-category' element={<AdminPermission><SubCategory /></AdminPermission>} />
            <Route path='/dashboard/upload-product' element={<AdminPermission><UploadProduct /></AdminPermission>} />
            <Route path='/dashboard/product' element={<AdminPermission><ProductAdmin /></AdminPermission>} />
          </Route>
          <Route path=':category'>
            <Route path=':subCategory' element={<ProductListPage />}></Route>
          </Route>
          <Route path='/product/:product' element={<ProductDisplayPage />}></Route>
          <Route path='/cart' element={<CartMobile />}></Route>
          <Route path='/checkout' element={<CheckOutPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
)
