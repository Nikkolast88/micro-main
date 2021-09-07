// http.ts

import { HttpResponse } from '@/typings/http';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Credentials': true,
  'X-Requested-With': 'XMLHttpRequest',
};

// We can use the following function to inject the JWT token through an interceptor
// We get the `accessToken` from the localStorage that we set when we authenticate
const injectToken = (config: AxiosRequestConfig): AxiosRequestConfig => {
  try {
    const token = localStorage.getItem('accessToken');

    if (token != null) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error) {
    throw new Error(error as string);
  }
};

class Http {
  private instance: AxiosInstance | null = null;

  private get http(): AxiosInstance {
    return this.instance != null ? this.instance : this.initHttp();
  }

  initHttp() {
    const http = axios.create({
      baseURL: window.ServerConfig.BASE_URL,
      headers,
      withCredentials: true,
    });

    http.interceptors.request.use(injectToken, (error) =>
      Promise.reject(error),
    );

    http.interceptors.response.use(
      (response: AxiosResponse<HttpResponse<null>>) => {
        const data = response.data;
        return this.handleBackError(data);
      },
      (error) => {
        const { response } = error;
        return this.handleError(response);
      },
    );

    this.instance = http;
    return http;
  }

  request<T = unknown, R = AxiosResponse<T>>(
    config: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.request(config);
  }

  get<T = unknown, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.get<T, R>(url, config);
  }

  post<T = unknown, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.post<T, R>(url, data, config);
  }

  put<T = unknown, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.put<T, R>(url, data, config);
  }

  delete<T = unknown, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.delete<T, R>(url, config);
  }

  // 处理全局应用错误
  // 我们可以根据状态代码处理一般的应用程序错误
  private handleError(error: { status: number }) {
    const { status } = error;

    switch (status) {
      case 500: {
        // Handle InternalServerError
        break;
      }
      case 404: {
        // Handle Forbidden
        break;
      }
      case 401: {
        // Handle Unauthorized
        break;
      }
      case 300: {
        // Handle TooManyRequests
        break;
      }
    }

    return Promise.reject(error);
  }
  // 接口200，后端抛出的异常
  private handleBackError(data: HttpResponse<null>) {
    const { status, body, msg } = data;
    switch (status) {
      case 401:
        //认证未通过
        break;
      case 402:
        // 请求参数错误
        break;
      case 403:
        // 业务异常
        break;
      case 500:
        // 服务器错误
        break;
      case 501:
        // 接口未授权
        break;
      default:
        // 0 成功
        return Promise.resolve(body);
    }
    return Promise.reject(msg);
  }
}

export const http = new Http();
