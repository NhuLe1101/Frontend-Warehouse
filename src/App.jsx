import './App.css';
import './hello.css';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Link,
} from "react-router-dom";
import Home from './pages/home/Home';
import BinPacking from './pages/binpacking/BinPacking';
import Warehouse from './pages/warehouse/Warehouse';
import Login from './pages/login/Login';
import Booking from './pages/booking/Booking';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
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
            element: <Booking />,
          },
          {
            path: "/warehouse",
            element: <Warehouse />,
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
            element: <BinPacking />,
          }
        ],
      },
    ]);

    return <RouterProvider router={router} />
  };
}
export default App;
