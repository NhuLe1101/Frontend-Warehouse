import axios from 'axios';

const API_URL = 'http://localhost:8080/api/compartments';

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

// Tạo đối tượng CompartmentService để quản lý các hàm API
const CompartmentService = {
  addItemToCompartment,
  updateItemQuantity,
  deleteItemFromCompartment,
};

export default CompartmentService;
