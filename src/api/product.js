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

const ProductService = {
    getAllProducts
};

export default ProductService;