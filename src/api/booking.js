import axios from "axios";

const API_URL = "http://localhost:8080/api/booking/";

// Upload booking
const upload = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return axios
    .post(API_URL + "upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log(response.data);
      return response.data.message;
    })
    .catch((error) => {
      console.error("Có lỗi xảy ra:", error);
      if (error.response) {
        console.log(error.response.data.message);
        return error.response.data.message;
      } else {
        return "Có lỗi không xác định xảy ra.";
      }
    });
};

// Get all bookings
const getAllBookings = () => {
  return axios
    .get(API_URL + "all")
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Có lỗi xảy ra khi lấy dữ liệu:", error);
      if (error.response) {
        console.log(error.response.data.message);
        return error.response.data.message;
      } else {
        return "Có lỗi không xác định xảy ra.";
      }
    });
};

// Delete booking
const deleteBooking = (bookingId) => {
  return axios
    .delete(API_URL + `delete/${bookingId}`)
    .then((response) => {
      console.log(response.data.message);
      return response.data.message;
    })
    .catch((error) => {
      console.error("Có lỗi xảy ra khi xóa:", error);
      if (error.response) {
        console.log(error.response.data.message);
        return error.response.data.message;
      } else {
        return "Có lỗi không xác định xảy ra.";
      }
    });
};


// Update booking
const updateBooking = (bookingId, email, phoneNumber, fullName, delivery, status) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("phoneNumber", phoneNumber);
  formData.append("fullName", fullName);
  formData.append("delivery", delivery);
  formData.append("status", status);

  return axios
    .put(API_URL + `update/${bookingId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log(response.data);
      return response.data.message;
    })
    .catch((error) => {
      console.error("Có lỗi xảy ra khi cập nhật:", error);
      if (error.response) {
        console.log(error.response.data.message);
        return error.response.data.message;
      } else {
        return "Có lỗi không xác định xảy ra.";
      }
    });
};


const BookingService = {
  upload,
  getAllBookings,
  deleteBooking,
  updateBooking,
};

export default BookingService;
