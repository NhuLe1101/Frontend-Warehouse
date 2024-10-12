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

  const updateProduct = ( product) => {
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
    updateProduct
};


export default ProductService;