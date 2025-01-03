import './App.css';
import './hello.css';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Home from './pages/home/Home';
import Warehouse from './pages/warehouse/Warehouse';
import Login from './pages/login/Login';
import Booking from './pages/booking/Booking';
import Product from './pages/product/Product';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Dashboard from './Components/Dashboard/Dashboard';
import CheckoutListReport from './Components/CheckoutListReport/CheckoutListReport';
import DeliveryReport from './Components/DeliveryReport/DeliveryReport';
import Report from './pages/report/report';
const App = () => {
  const Layout = () => {
    return (
      <div>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    )
  }

  const Layout2 = () => {
    return (
      <div>
        <Navbar />
        <Outlet />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        {
          path: "/booking",
          element: <Booking />,
        },
        {
          path: "/product",
          element: <Product />,
        },
        {
          path: "/report",
          element: <Report />,
          children: [
            { path: "", Component: Dashboard },
            { path: "reports/checkout-list", Component: CheckoutListReport },
            { path: "reports/delivery-confirmation", Component: DeliveryReport },
          ],
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
    {
      path: "/",
      element: <Layout2 />,
      children: [
        {
          path: "/warehouse",
          element: <Warehouse />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;