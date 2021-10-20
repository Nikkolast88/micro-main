// http.ts

import { HttpResponse } from '@/typings/http';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
// import qs from 'qs';
import { getTranslate, getLanguage } from '@/plugins';
import store from '@/store';
const headers: Readonly<Record<string, string>> = {
  Accept: 'application/json',
  'Accept-Lang': getLanguage(),
};

// We can use the following function to inject the JWT token through an interceptor
// We get the `accessToken` from the localStorage that we set when we authenticate
const InterceptRequestConfig = (
  config: AxiosRequestConfig,
): AxiosRequestConfig => {
  try {
    const headers = config.headers;
    // 如果不存在，直接返回config
    if (!headers) return config;
    headers['token'] = store.getters.token;
    // 拦截并转换数据
    // const headers = config.headers;
    // if (
    //   headers &&
    //   headers['Content-Type'] !== 'application/json; charset=UTF-8'
    // ) {
    //   if (
    //     Object.prototype.toString.call(config.data) !== '[object FormData]' &&
    //     config.data
    //   ) {
    //     config.data = qs.stringify(config.data);
    //   }
    // }
    // // 存放token
    // const token = localStorage.getItem('accessToken');

    // if (token != null) {
    //   if (headers) {
    //     headers.Authorization = `Bearer ${token}`;
    //   }
    // }
    return config;
  } catch (error) {
    throw new Error(error as string);
  }
};

// 注册axios
const setupHttp = () => {
  const http = axios.create({
    baseURL: window.manifest.API,
    headers,
    withCredentials: true,
  });

  http.interceptors.request.use(InterceptRequestConfig, (error) =>
    Promise.reject(error),
  );

  http.interceptors.response.use(
    (response: AxiosResponse<unknown, unknown>) => {
      const data = response.data;
      return handleBackError(data as HttpResponse<unknown>);
    },
    (error) => {
      const { response } = error;
      return handleError(response);
    },
  );

  // this.instance = http;
  return http;
};

// 处理全局应用错误
// 我们可以根据状态代码处理一般的应用程序错误
const handleError = (error: { status: number }) => {
  if (error) {
    const { status } = error;
    return getTranslate(status);
  }

  return Promise.reject(error);
};
// 接口200，后端抛出的异常
const handleBackError = (data: HttpResponse<unknown>) => {
  const { status, body, msg } = data;
  // 0 成功
  if (status === 0) {
    return Promise.resolve(body);
  }
  return Promise.reject(getTranslate(msg));
};
// }
export const http = setupHttp();
