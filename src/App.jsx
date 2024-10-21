import './App.css';
import './hello.css';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Route,
} from "react-router-dom";
import Home from './pages/home/Home';
import Warehouse from './pages/warehouse/Warehouse';
import Login from './pages/login/Login';
import Booking from './pages/booking/Booking';
import Product from './pages/product/Product';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Statistic from './pages/statistic/Statistic';
import Dashboard from './Components/Dashboard/Dashboard';
import Report from './Components/Report/Report';
import Static from './Components/Static/Static';

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
          path: "/statistic",
          element: <Statistic />,
          children: [
            { path: "", Component: Dashboard },
            { path: "report", Component: Report },
            { path: "static", Component: Static },
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