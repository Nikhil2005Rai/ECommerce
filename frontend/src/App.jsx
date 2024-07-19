import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Shop from "./pages/Shop";
import ShopCategory from "./pages/ShopCategory";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import LoginSignup from "./pages/LoginSignup";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const App = () => {
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
          element: <ShopCategory category="men" />,
        },
        {
          path: "/womens",
          element: <ShopCategory category="women" />,
        },
        {
          path: "/kids",
          element: <ShopCategory category="kid" />,
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
