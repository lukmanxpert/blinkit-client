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

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<Home />}></Route>
        <Route path='/search' element={<SearchPage />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/forgot-password' element={<ForgotPassword />}></Route>
        <Route path='/otp-verification' element={<OtpVerification />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
)
