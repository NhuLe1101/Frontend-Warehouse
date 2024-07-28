import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; 

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  }

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">
          <img src="logo_navbar.png" alt="" width={'50px'} />
          This is logo
        </Link>
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        <img src="icon_menu.png" alt="" />
      </div>
      <ul className={`nav-links ${showMenu ? 'active' : ''}`}>
        <li>
          <Link to="/">Trang chủ</Link>
        </li>
        <li>
          <Link to="/">Booking</Link>
        </li>
        <li>
          <Link to="/binpacking">Sắp xếp</Link>
        </li>
        <li>
          <Link to="/">Kho hàng</Link>
        </li>
        {showMenu && (
          <li>
            <Link to="/">Đăng nhập</Link>
          </li>
        )}
      </ul>
      <div className='login'>
          <Link to="/">Đăng nhập</Link>
      </div>

    </div>
  );
}

export default Navbar;
