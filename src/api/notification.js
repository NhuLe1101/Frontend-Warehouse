import axios from "axios";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const API_URL = "http://localhost:8080/api/notifications";

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

// Đăng ký WebSocket cho thông báo (có thể triển khai như một hàm kết nối WebSocket)
const connectWebSocket = (onMessageReceived) => {
  const socket = new SockJS('http://localhost:8080/ws');
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
