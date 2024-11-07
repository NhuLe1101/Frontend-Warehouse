import axios from "axios";

const API_URL = "http://localhost:8080/api/product/";

const getAllProducts = () => {
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

const getProductsByStatus = () => {
  return axios
    .get(API_URL + "byStatus")
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

const getProductsIsNullCompartment = () => {
  return axios
    .get(API_URL + "items-not-in-compartments")
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

const getProductsByCheckinDecrease = () => {
  return axios
    .get(API_URL + "items-check-in-decrease")
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

const getProductsByCheckinIncrease = () => {
  return axios
    .get(API_URL + "items-check-in-increase")
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

const getProductsByCheckoutIncrease = () => {
  return axios
    .get(API_URL + "items-check-out-increase")
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

const getProductsByCheckoutDecrease = () => {
  return axios
    .get(API_URL + "items-check-out-decrease")
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

const getProductsByName = (name) => {
  return axios
    .get(`${API_URL}search`, {
      params: { name }, // Gửi tham số name qua query params
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Có lỗi xảy ra khi tìm kiếm:", error);
      if (error.response) {
        console.log(error.response.data.message);
        return error.response.data.message;
      } else {
        return "Có lỗi không xác định xảy ra.";
      }
    });
};

const updateProduct = (product) => {
  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("quantity", product.quantity);
  formData.append("status", product.status);
  formData.append("checkin", product.checkin);
  formData.append("checkout", product.checkout);
  formData.append("delivery", product.delivery);
  formData.append("weight", product.weight);

  return axios
    .put(API_URL + `update/${product.itemId}`, formData, {
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

const ProductService = {
  getAllProducts,
  updateProduct,
  getProductsByName,
  getProductsIsNullCompartment,
  getProductsByCheckinDecrease,
  getProductsByCheckinIncrease,
  getProductsByCheckoutDecrease,
  getProductsByCheckoutIncrease,
  getProductsByStatus,
};

export default ProductService;
