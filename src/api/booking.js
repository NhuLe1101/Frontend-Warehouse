import axios from "axios";

const API_URL = "http://localhost:8080/api/booking/";

const upload = (email, phoneNumber, fullName, delivery, file, status, checkin, checkout) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("phoneNumber", phoneNumber);
  formData.append("fullName", fullName);
  formData.append("delivery", delivery);
  formData.append("file", file);
  formData.append("status", status);
  formData.append("checkin", checkin);
  formData.append("checkout", checkout);

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

const BookingService = {
    upload,
    getAllBookings
};

export default BookingService;