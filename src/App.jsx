// eslint-disable-next-line
import './App.css';
import './hello.css';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Home from './pages/home/Home';
import BinPacking from './pages/binpacking/BinPacking';
import Warehouse from './pages/warehouse/Warehouse';
import Login from './pages/login/Login';
import Booking from './pages/booking/Booking';
import Product from './pages/product/Product';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
const App = () => {
  {
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
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/booking",
            element: (
              // <PrivateRoute>
                <Booking />
              // </PrivateRoute>
            ),
          },
          {
            path: "/product",
            element: (
              // <PrivateRoute>
              //  <Product />
                  <Product/>
              // </PrivateRoute>
            ),
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
            path: "/binpacking",
            element: (
              // <PrivateRoute>
                <BinPacking />
              // </PrivateRoute>
            ),
          },
          {
            path: "/warehouse",
            element: (
              // <PrivateRoute>
                <Warehouse />
              // </PrivateRoute>
            ),
          },
        ],
      },
    ]);

    return <RouterProvider router={router} />
  };
}
export default App;