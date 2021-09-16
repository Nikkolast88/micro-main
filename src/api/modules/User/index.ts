import { http } from '@/utils/http';

/**
 * @description: 登录接口
 * @param {API.TUser} data
 * @return {*}
 */
export function getUserLogin<T>(data: API.User.TLogin): Promise<T> {
  return http.post<API.User.TLogin, T>('/login/login', data);
}

/**
 * @description: 获取登录图形验证码
 * @param {unknown} data
 * @return {*}
 */
export function getCaptchaImg<T>(data: unknown): Promise<T> {
  return http.post<unknown, T>('/login/getVerifyImg', data);
}

export function postCaptchaVerify<T>(data: API.User.TVerify): Promise<T> {
  return http.post<API.User.TVerify, T>('/login/verifyImg', data);
}
