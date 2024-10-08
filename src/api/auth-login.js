import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        sessionStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  sessionStorage.removeItem('user');
};

const getCurrentUser = () => {
  if (typeof window !== 'undefined') {
    return JSON.parse(sessionStorage.getItem("user"));
  }
};

const AuthService = {
  login,
  logout,
  getCurrentUser,
};

export default AuthService;