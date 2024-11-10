import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IconButton, Badge, Snackbar, Alert, Popper, Paper, List, ListItem, ListItemText } from '@mui/material';
import { ListItemIcon } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import AuthService from '../../api/auth-login';
import './navbar.css';
import moment from 'moment';


const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [showBadge, setShowBadge] = useState(true);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);

      // Gọi API để lấy danh sách thông báo ban đầu
      fetch('http://localhost:8080/api/notifications')
        .then(response => response.json())
        .then(data => {
          console.log('Fetched notifications:', data);
          setNotifications(data);
        })
        .catch(error => {
          console.error('Error fetching notifications:', error);
        });

      // Kết nối với WebSocket server
      const socket = new SockJS('http://localhost:8080/ws');
      const stompClient = Stomp.over(socket);

      stompClient.connect({}, () => {
        console.log('Connected to WebSocket');
        stompClient.subscribe('/topic/notifications', (message) => {
          console.log('Received message:', message.body);
          const notification = JSON.parse(message.body); // Nếu thông báo là JSON
          setNotifications((prev) => [notification, ...prev]);
          setNewNotification(notification);
          setOpenSnackbar(true);
        });
      }, (error) => {
        console.error('Error connecting to WebSocket:', error);
      });

      return () => {
        stompClient.disconnect();
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

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">
          <img src="/images/logo-warehouse.png" alt="Logo" width={'80px'} />
        </Link>
      </div>
      <div className="menu-icon">
        <img src="icon_menu.png" alt="Menu" />
      </div>
      <ul className={`nav-links`}>
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
      </ul>
      {currentUser ? (
        <div className='login-success'>
          <IconButton color="inherit" onClick={handleNotificationClick}>
            <Badge badgeContent={showBadge ? notifications.length : 0} color="error">
              <NotificationsIcon style={{ color: '#fff' }} />
            </Badge>
          </IconButton>
          <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement="bottom-start" style={{ zIndex: 1300 }}>
            <Paper style={{ maxHeight: '400px', width: '350px', overflowY: 'auto' }}>
              {notifications.length > 0 ? (
                <List>
                  {notifications.map((notification, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        {notification.type === 'CHECKOUT_REMINDER' && <AccessAlarmIcon color="error" />}
                        {notification.type === 'ITEM_CHECKOUT' && <CheckCircleIcon color="success" />}
                      </ListItemIcon>
                      <ListItemText
                        primary={notification.message}
                        secondary={moment(notification.timestamp).format('DD/MM/YYYY HH:mm')} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <div style={{ padding: '10px', textAlign: 'center' }}>Không có thông báo</div>
              )}
            </Paper>
          </Popper>
          <li className='profileName-user'>
            <span>{currentUser.profileName}</span>
          </li>
          <span className='dot-login'>|</span>
          <li onClick={() => AuthService.logout()}>
            <Link to="/">Đăng xuất</Link>
          </li>
        </div>
      ) : (
        <li className={location.pathname === '/login' ? 'active' : ''}>
          <Link className='login' to="/login">Đăng nhập</Link>
        </li>
      )}

      {/* Snackbar hiển thị thông báo mới cho toàn user */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={10000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={handleSnackbarClose} severity="info">
          {newNotification?.message}
        </Alert>
      </Snackbar>

    </div>
  );
};

export default Navbar;
