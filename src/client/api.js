import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // Replace with your backend's URL
  headers: {
    "Content-Type": "application/json",
  },
});
