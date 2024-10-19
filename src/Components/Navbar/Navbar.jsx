import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';
import AuthService from '../../api/auth-login';
const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(undefined);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  }
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);
  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };
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
        <li className={location.pathname === '/statistic' ? 'active' : ''}>
          <Link to="/statistic">Báo cáo</Link>
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
      {currentUser ? (
          <div className='login-success'>
            <li className='profileName-user'>
              <span>{currentUser.profileName}</span>
            </li>
            <span className='dot-login'>|</span>
            <li onClick={logOut}>
              <Link to="/">Đăng xuất</Link>
            </li>
          </div>
        ) : (
          <li className={location.pathname === '/login' ? 'active' : ''}>
            <Link className='login' to="/login">Đăng nhập</Link>
          </li>
        )}
    </div>
  );
}

export default Navbar;
