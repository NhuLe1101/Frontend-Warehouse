import axios from "axios";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const API_URL = `${process.env.REACT_APP_API_URL}/api/notifications`;

// Lấy danh sách thông báo
const getNotifications = () => {
  return axios.get(API_URL).then(response => response.data);
};

// Đánh dấu thông báo là đã đọc
const markAsRead = (id) => {
  return axios.put(`${API_URL}/${id}/mark-as-read`).then(response => response.data);
};

// Xóa thông báo
const deleteNotification = (id) => {
  return axios.delete(`${API_URL}/${id}`).then(response => response.data);
};

// Đăng ký WebSocket cho thông báo
const connectWebSocket = (onMessageReceived) => {
  const socket = new SockJS(`${process.env.REACT_APP_API_URL}/ws`);
  const stompClient = Stomp.over(socket);

  stompClient.connect({}, () => {
    console.log('Connected to WebSocket');
    stompClient.subscribe('/topic/notifications', (message) => {
      console.log('Received message:', message.body);
      const notification = JSON.parse(message.body);
      onMessageReceived(notification);
    });
  }, (error) => {
    console.error('Error connecting to WebSocket:', error);
  });

  return () => {
    stompClient.disconnect();
  };
};

// Xuất các hàm trong NotificationService
const NotificationService = {
  getNotifications,
  markAsRead,
  deleteNotification,
  connectWebSocket,
};

export default NotificationService;
