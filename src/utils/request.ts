import axios from 'axios';
import { message, notification } from 'ant-design-vue';
const prevfix = '/api/v1';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// create an axios instance
const service = axios.create({
  baseURL: prevfix, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 500000, // request timeout
});
// request interceptor
service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `token ${token}`;
      console.log('拿到token');
    }
    console.log('request请求配置', config);
    return config;
  },
  error =>
    // do something with request error
    Promise.reject(error),
);

// response interceptor
service.interceptors.response.use(
  response => {
    const { data } = response;
    // TODO
    // // 登录的两个接口不弹错误窗
    // const isLoginURL = url.indexOf('/login') >= 0 || url.indexOf('/auth/userRole') >= 0;
    // 解析响应对象
    if (response.status === 200 && data.code !== 200) {
      if (window.location.href.indexOf('/login') <= 0) {
        notification.error({
          message: '请求错误',
          description: `${data.message}`,
        });
      }
    }
    return data;
  },
  error => {

    notification.error({
      message: '请求错误',
      // description: `${error.message}`,
    });
  },
);

export default service;
