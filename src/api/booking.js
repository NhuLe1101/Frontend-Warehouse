import axios from "axios";

// const API_URL = "http://localhost:8080/api/booking/";
const API_URL = `${process.env.REACT_APP_API_URL}/api/booking/`;

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


// Update booking
const updateBooking = ( booking) => {
  const formData = new FormData();
  formData.append("email", booking.customerEmail);
  formData.append("phoneNumber", booking.numberphone);
  formData.append("fullName", booking.customerName);
  formData.append("filePath", booking.excelFile);

  return axios
    .put(API_URL + `update/${booking.id}`, formData, {
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

const getTotalCustomers = () => {
  return axios
    .get(API_URL + "totalCustomers")
    .then((response) => {
      console.log("Tổng số lượng khách hàng:", response.data);
      return response.data; // Trả về tổng số lượng khách hàng
    })
    .catch((error) => {
      console.error("Có lỗi xảy ra khi lấy tổng số lượng khách hàng:", error);
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
  updateBooking,
  getTotalCustomers,
};

export default BookingService;
