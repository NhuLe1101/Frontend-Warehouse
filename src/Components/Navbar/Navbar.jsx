import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  IconButton,
  Badge,
  Popper,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Snackbar,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CircleIcon from "@mui/icons-material/Circle";
import { Alert } from "@mui/material";
import AuthService from "../../api/auth-login";
import "./navbar.css";
import moment from "moment";
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
  const [menuVisible, setMenuVisible] = useState(false); // State for menu visibility
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      // Gọi API để lấy danh sách thông báo ban đầu
      NotificationService.getNotifications()
        .then((data) => {
          console.log("Fetched notifications:", data);
          setNotifications(data);
        })
        .catch((error) => {
          console.error("Error fetching notifications:", error);
        });

      // Kết nối với WebSocket server
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
    if (showBadge) {
      setShowBadge(false);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

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
      .then(() => {
        setNotifications((prev) =>
          prev.map((notification) =>
            notification.id === id
              ? { ...notification, status: "READ" }
              : notification
          )
        );
        handleMenuClose();
      })
      .catch((error) => {
        console.error("Error marking notification as read:", error);
      });
  };

  const deleteNotification = (id) => {
    NotificationService.deleteNotification(id)
      .then(() => {
        setNotifications((prev) =>
          prev.filter((notification) => notification.id !== id)
        );
        handleMenuClose();
      })
      .catch((error) => {
        console.error("Error deleting notification:", error);
      });
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

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
        <ul
          className={`nav-links`}
          style={menuVisible ? { display: "flex" } : null}
        >
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
          <IconButton color="inherit" onClick={handleNotificationClick}>
            <Badge
              badgeContent={
                showBadge
                  ? notifications.filter((n) => n.status === "UNREAD").length
                  : 0
              }
              color="error"
            >
              <NotificationsIcon style={{ color: "#fff" }} />
            </Badge>
          </IconButton>
          <Popper
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            placement="bottom-start"
            style={{ zIndex: 1300 }}
          >
            <Paper
              style={{ maxHeight: "400px", width: "400px", overflowY: "auto" }}
            >
              {notifications.length > 0 ? (
                <List>
                  {notifications.map((notification, index) => (
                    <ListItem
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <ListItemIcon>
                          {notification.type === "CHECKOUT_REMINDER" && (
                            <AccessAlarmIcon color="error" />
                          )}
                          {notification.type === "ITEM_CHECKOUT" && (
                            <CheckCircleIcon color="success" />
                          )}
                        </ListItemIcon>
                        <ListItemText
                          primary={notification.message}
                          secondary={moment(notification.timestamp).format(
                            "DD/MM/YYYY HH:mm"
                          )}
                        />
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                          onClick={(e) => handleMenuClick(e, notification)}
                        >
                          <MoreVertIcon />
                        </IconButton>

                        {/* Circle icon để hiển thị nếu chưa đọc */}
                        {notification.status === "UNREAD" && (
                          <CircleIcon
                            style={{
                              color: "#5aa7ff",
                              marginLeft: "5px",
                              fontSize: "1rem",
                            }}
                          />
                        )}
                      </div>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <div style={{ padding: "10px", textAlign: "center" }}>
                  Không có thông báo
                </div>
              )}
            </Paper>
          </Popper>
          <Menu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => markAsRead(selectedNotification.id)}>
              Đánh dấu đã đọc
            </MenuItem>
            <MenuItem
              onClick={() => deleteNotification(selectedNotification.id)}
            >
              Xóa thông báo
            </MenuItem>
          </Menu>
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

      {/* Snackbar hiển thị thông báo mới cho toàn user */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={10000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert onClose={handleSnackbarClose} severity="info">
          {newNotification?.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Navbar;
