import React from "react";
import {
  Popper,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Notifications as NotificationsIcon,
  AccessAlarm as AccessAlarmIcon,
  CheckCircle as CheckCircleIcon,
  MoreVert as MoreVertIcon,
  Circle as CircleIcon,
} from "@mui/icons-material";
import moment from "moment";

const Notification = ({
  notifications,
  handleMenuClick,
  handleMenuClose,
  menuAnchorEl,
  selectedNotification,
  markAsRead,
  deleteNotification,
  newNotification,
  openSnackbar,
  handleSnackbarClose,
  handleNotificationClick,
  anchorEl,
  showBadge,
}) => {
  return (
    <div className="notification-container">
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
        <MenuItem onClick={() => deleteNotification(selectedNotification.id)}>
          Xóa thông báo
        </MenuItem>
      </Menu>
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

export default Notification;
