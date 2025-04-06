import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001", // o tu nuevo backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
