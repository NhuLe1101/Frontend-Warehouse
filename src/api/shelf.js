import axios from "axios";

// const API_URL = "http://localhost:8080/api/shelf";
const API_URL = `${process.env.REACT_APP_API_URL}/api/shelf`;

const getAllShelves = () => {
    return axios.get(API_URL).then((response) => {
        return response.data;
    });
};

const ShelfService = {
    getAllShelves,
};

export default ShelfService;