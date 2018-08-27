import axios from "axios";
// import { Message } from "element-ui";
import { getToken } from "@/utils/cookie";

const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // request timeout
});

// 添加一个请求拦截器
service.interceptors.request.use(
  config => {
    config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    //请求的时候头部带上token
    const tokens = getToken();
    if (tokens) {
      const data = tokens.split("-");
      config.headers["userid"] = data[0];
      config.headers["token"] = data[1];
    }
    // console.log("发送", config);
    return config;
  },
  error => {
    //请求出错
    console.log("发送错误", error);
    Promise.reject(error);
  }
);

// 添加一个响应拦截器
service.interceptors.response.use(
  response => response,
  error => {
    console.log("响应错误", error);
    return Promise.reject(error);
  }
);

export default service;
