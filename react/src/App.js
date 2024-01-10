import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate,Redirect, useNavigate } from "react-router-dom";
import Layout from "./pages/Layout";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useContext, useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import PageSignIn from "./pages/PageSignIn";
import DropdownAvatar from "./components/dropdown_avatar/DropdownAvatar";
import {AuthContext, AuthContextProvider} from "./context/AuthContext";
import { About } from "./components/about/About";
import { UserInfo } from "./components/user_info/UserInfo";
import { PageRegister } from "./pages/PageRegister";
import ProductPage from "./components/product_page/product_page";
function App() {
  const navigate = useNavigate();
  const {isLogin}  = useContext(AuthContext)
    useEffect(() => {
    AOS.init();
  }, [])
  console.log('trạng thái ',isLogin);
  return   <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="accounts" element={<Layout />}>
        <Route path="register" element={<PageRegister />} />
        <Route path="signin" element={isLogin ? <Navigate replace to="/"/> : <PageSignIn/>} />
        <Route path="info" element={<UserInfo />} />
      </Route>
      <Route path="products" element={<Layout />}>
        <Route path="1" element = {<ProductPage/>}/>
      </Route>
      <Route path="/avatar" element={<DropdownAvatar />} />

    </Routes>
}

export default App;
