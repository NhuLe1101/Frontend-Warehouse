import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Notification from "./Notification";
import { IconButton } from "@mui/material";
import AuthService from "../../api/auth-login";
import "./navbar.css";
import NotificationService from "../../api/notification";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [showBadge, setShowBadge] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      NotificationService.getNotifications()
        .then((data) => setNotifications(data))
        .catch((error) => console.error("Error fetching notifications:", error));

      const disconnectWebSocket = NotificationService.connectWebSocket(
        (notification) => {
          setNotifications((prev) => [notification, ...prev]);
          setNewNotification(notification);
          setOpenSnackbar(true);
        }
      );

      return () => {
        disconnectWebSocket();
      };
    }
  }, []);

  const handleNotificationClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    if (showBadge) setShowBadge(false);
  };

  const handleSnackbarClose = () => setOpenSnackbar(false);

  const handleMenuClick = (event, notification) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedNotification(notification);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedNotification(null);
  };

  const markAsRead = (id) => {
    NotificationService.markAsRead(id)
      .then(() =>
        setNotifications((prev) =>
          prev.map((notification) =>
            notification.id === id
              ? { ...notification, status: "READ" }
              : notification
          )
        )
      )
      .catch((error) => console.error("Error marking notification as read:", error));
    handleMenuClose();
  };

  const deleteNotification = (id) => {
    NotificationService.deleteNotification(id)
      .then(() =>
        setNotifications((prev) =>
          prev.filter((notification) => notification.id !== id)
        )
      )
      .catch((error) => console.error("Error deleting notification:", error));
    handleMenuClose();
  };

  const toggleMenu = () => setMenuVisible(!menuVisible);

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">
          <img src="/images/logo-warehouse.png" alt="Logo" width={"80px"} />
        </Link>
      </div>
      {currentUser ? (
        <div className="menu-icon" onClick={toggleMenu}>
          <img src="icon_menu.png" alt="Menu" />
        </div>
      ) : (
        <li className={location.pathname === "/login" ? "active" : ""}>
          <Link className="login" to="/login">
            Đăng nhập
          </Link>
        </li>
      )}
      {currentUser && (
        <ul className={`nav-links`} style={menuVisible ? { display: "flex" } : null}>
          <li className={location.pathname === "/" ? "active" : ""}>
            <Link to="/">Trang chủ</Link>
          </li>
          <li className={location.pathname === "/booking" ? "active" : ""}>
            <Link to="/booking">Booking</Link>
          </li>
          <li className={location.pathname === "/product" ? "active" : ""}>
            <Link to="/product">Sản phẩm</Link>
          </li>
          <li className={location.pathname === "/report" ? "active" : ""}>
            <Link to="/report">Báo cáo</Link>
          </li>
          <li className={location.pathname === "/warehouse" ? "active" : ""}>
            <Link to="/warehouse">Kho hàng</Link>
          </li>
        </ul>
      )}
      {currentUser && (
        <div className="login-success">
          <Notification
            notifications={notifications}
            handleNotificationClick={handleNotificationClick}
            handleSnackbarClose={handleSnackbarClose}
            handleMenuClick={handleMenuClick}
            handleMenuClose={handleMenuClose}
            markAsRead={markAsRead}
            deleteNotification={deleteNotification}
            newNotification={newNotification}
            openSnackbar={openSnackbar}
            anchorEl={anchorEl}
            menuAnchorEl={menuAnchorEl}
            selectedNotification={selectedNotification}
            showBadge={showBadge}
          />
          <li className="profileName-user">
            <span>{currentUser.profileName}</span>
          </li>
          <span className="dot-login">|</span>
          <li
            onClick={() => {
              AuthService.logout();
              window.location.href = "/";
            }}
          >
            <Link to="/">Đăng xuất</Link>
          </li>
        </div>
      )}
    </div>
  );
};

export default Navbar;
