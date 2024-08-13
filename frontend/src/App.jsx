import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Shop from "./pages/Shop";
import ShopCategory from "./pages/ShopCategory";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import LoginSignup from "./pages/LoginSignup";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import men_bannar from './assets/banner_mens.png'
import women_bannar from './assets/banner_women.png'
import kid_bannar from './assets/banner_kids.png'
import axios from "axios";


const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const App = () => {
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
  // axios.defaults.baseURL = "http://localhost:8000/api/v1"
  
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Shop />,
        },
        {
          path: "/mens",
          element: <ShopCategory category="men" banner={men_bannar} />,
        },
        {
          path: "/womens",
          element: <ShopCategory category="women" banner={women_bannar} />,
        },
        {
          path: "/kids",
          element: <ShopCategory category="kid" banner={kid_bannar} />,
        },
        {
          path: "/product",
          element: <Product />,
          children: [
            {
              path: ":productId",
              element: <Product />,
            },
          ],
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/login",
          element: <LoginSignup />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
