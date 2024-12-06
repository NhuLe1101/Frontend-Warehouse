import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/compartments";
//const API_URL = `${process.env.REACT_APP_API_URL}/api/compartments/`;

// Hàm thêm item vào compartment
const addItemToCompartment = (compartmentId, itemId, quantity) => {
  return axios.post(`${API_URL}/${compartmentId}/addItem`, {
    itemId: itemId,
    quantity: quantity,
  });
};

// Hàm cập nhật số lượng item trong compartment
const updateItemQuantity = (compartmentId, itemId, quantity) => {
  return axios.put(`${API_URL}/${compartmentId}/updateQuantity`, {
    itemId: itemId,
    quantity: quantity,
  });
};

// Hàm xóa item khỏi compartment
const deleteItemFromCompartment = (compartmentId, itemId) => {
  return axios.delete(`${API_URL}/${compartmentId}/removeItem/${itemId}`);
};

// Hàm checkout item từ compartment
const checkoutItem = (compartmentId, itemId, referenceNo, delivery) => {
  return axios.post(`${API_URL}/${compartmentId}/checkout/${itemId}`, null, {
    params: {
      referenceNo: referenceNo,
      delivery: delivery,
    },
    headers: authHeader(), // Truyền token vào header để xác thực
  });
};

// Hàm lấy danh sách các item đã checkout nhưng chưa xác nhận
const getPendingCheckoutItems = () => {
  return axios.get(`${API_URL}/checkout/pending`);
};

// Hàm xác nhận checkout cho một record
const confirmCheckout = (recordId) => {
  return axios.post(`${API_URL}/checkout/confirm/${recordId}`);
};

// Hàm hủy checkout và trả item lại vào compartment
const cancelCheckout = (recordId) => {
  return axios.post(`${API_URL}/checkout/cancel/${recordId}`);
};
// Tạo đối tượng CompartmentService để quản lý các hàm API
const CompartmentService = {
  addItemToCompartment,
  updateItemQuantity,
  deleteItemFromCompartment,
  checkoutItem,
  getPendingCheckoutItems,
  confirmCheckout,
  cancelCheckout,
};

export default CompartmentService;
