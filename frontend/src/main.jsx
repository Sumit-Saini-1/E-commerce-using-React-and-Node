import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from './error-page.jsx';
import Signup from './containers/signup/index.jsx';
import Login from './containers/login/index.jsx';
import Home from './containers/home/index.jsx';
import Cart from './containers/cart/cart.jsx';
import Myorders from './containers/myorders/index.jsx';
import ChangePassword from './containers/changePassword/index.jsx';
import ResetPassword from './containers/resetPassword/index.jsx';
import ForgotPassword from './containers/forgotPassword/index.jsx';

import AdminRoot from './adminroot.jsx';
import AdminHome from './containers/adminHome/index.jsx';
import ApproveProduct from './containers/approveProduct/index.jsx';
import ApproveSeller from './containers/approveSeller/index.jsx';
import CreateDistributor from './containers/createDistributor/index.jsx';

import SellerRoot from './sellerroot.jsx';
import SellerLogin from './containers/sellerLogin/index.jsx';
import SellerSignup from './containers/sellerSignUp/index.jsx';
import SellerHome from './containers/sellerHome/index.jsx';
import OrdersOut from './containers/ordersOut/index.jsx';
import AddProduct from './containers/addProduct/index.jsx';
import MyProducts from './containers/myProducts/index.jsx';
import UpdateProduct from './containers/updateProduct/index.jsx';
import SellerReport from './containers/sellerReport/index.jsx';

import DistributorLogin from './containers/distributorLogin/index.jsx';
import DistributorRoot from './distributorRoot.jsx';
import ToReceiveOrders from './containers/toReceiveOrders/index.jsx';
import ToShipOrders from './containers/toShip/index.jsx';
import CreateDeliveryPerson from './containers/createDeliveryPerson/index.jsx';

import DeliveryRoot from './deliveryRoot.jsx';
import DeliveryPersonLogin from './containers/deliveryPersonLogin/index.jsx';
import DeliveryPersonHome from './containers/deliveryPersonHome/index.jsx';

import AuthState from './context/auth/authState.jsx';
import CartState from './context/cartItems/cartItemState.jsx';


const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path:"/forgotPassword",
    element:<ForgotPassword/>
  },
  {
    path:"/resetPassword/:userId",
    element:<ResetPassword/>
  },
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/gotoCart",
        element: <CartState><Cart /></CartState>
      },
      {
        path: "/myOrder",
        element: <Myorders />
      },
      {
        path: "/changePassword",
        element: <ChangePassword />
      }
    ],
  },
  {
    path: "/admin",
    element: <AdminRoot />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/admin/adminHome",
        element: <AdminHome />
      },
      {
        path: "/admin/aproveProduct",
        element: <ApproveProduct />
      },
      {
        path: "/admin/aproveSeller",
        element: <ApproveSeller />
      },
      {
        path: "/admin/createDistributor",
        element: <CreateDistributor />
      }
    ]
  },
  {
    path: "/seller",
    element: <SellerRoot />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/seller/home",
        element: <SellerHome />
      },
      {
        path: "/seller/orderOut",
        element: <OrdersOut />
      },
      {
        path: "/seller/addProduct",
        element: <AddProduct />
      },
      {
        path: "/seller/myProduct",
        element: <MyProducts />
      },
      {
        path: "/seller/report",
        element: <SellerReport />
      },
      {
        path: "/seller/updateProduct",
        element: <UpdateProduct />
      }
    ]
  },
  {
    path: "/sellerLogin",
    element: <SellerLogin />
  },
  {
    path: "/sellerSignup",
    element: <SellerSignup />
  },
  {
    path: "/distributor",
    element: <DistributorRoot />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/distributor/toShip",
        element: <ToShipOrders />
      },
      {
        path: "/distributor/toReceive",
        element: <ToReceiveOrders />
      },
      {
        path: "/distributor/createDeliveryPerson",
        element: <CreateDeliveryPerson />
      }
    ]
  },
  {
    path: "/distributorLogin",
    element: <DistributorLogin />
  },
  {
    path: "/deliveryPersonLogin",
    element: <DeliveryPersonLogin />
  },
  {
    path: "/delivery",
    element: <DeliveryRoot />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/delivery/home",
        element: <DeliveryPersonHome />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthState>
      <RouterProvider router={router} />
    </AuthState>
  </React.StrictMode>
)
