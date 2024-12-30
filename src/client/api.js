import axios from "axios";
import { authToken } from "../store/user";

export const axiosInstance = axios.create({
  baseURL: "https://elysiaapis.onrender.com", // Replace with your backend's URL
  timeout: 10000,
  headers: {
    "X-Custom-Header": "foobar",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    //Do something before request is sent
    const token = authToken;
    console.log({ token });

    config.headers["Authorization"] = `Bearer ${token}`;

    return config;
  },
  function (error) {
    //Do something with request error
    return Promise.reject(error);
  }
);

//Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    //Any status code that lie within the range of Zxx cause this function to trigger
    //Do something with response data
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
