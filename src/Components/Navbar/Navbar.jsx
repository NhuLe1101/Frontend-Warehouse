import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css'; 

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  }

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">
          <img src="/images/logo-warehouse.png" alt="" width={'80px'} /> 
        </Link>
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        <img src="icon_menu.png" alt="" />
      </div>
      <ul className={`nav-links ${showMenu ? 'active' : ''}`}>
        <li className={location.pathname === '/' ? 'active' : ''}>
          <Link to="/">Trang chủ</Link>
        </li>
        <li className={location.pathname === '/booking' ? 'active' : ''}>
          <Link to="/booking">Booking</Link>
        </li>
        <li className={location.pathname === '/product' ? 'active' : ''}>
          <Link to="/product">Sản phẩm</Link>
        </li>
        <li className={location.pathname === '/binpacking' ? 'active' : ''}>
          <Link to="/binpacking">Sắp xếp</Link>
        </li>
        <li className={location.pathname === '/warehouse' ? 'active' : ''}>
          <Link to="/warehouse">Kho hàng</Link>
        </li>
        {showMenu && (
          <li className={location.pathname === '/login' ? 'active' : ''}>
            <Link to="/login">Đăng nhập</Link>
          </li>
        )}
      </ul>
      <li className={location.pathname === '/login' ? 'active' : ''}>
        <Link className='login' to="/login">Đăng nhập</Link>
      </li>
    </div>
  );
}

export default Navbar;
