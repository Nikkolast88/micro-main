import { http } from '@/utils/http';

/**
 * @description: 用户
 * @param {string | number} id ID
 */
type TUser = {
  id: string | number;
  name?: string;
  avatar?: string;
  email?: string;
}

/**
 * @description: 获取用户信息
 * @param {User} user
 * @return {*}
 */
export function UserInfo<T>(user: TUser): Promise<T> {
  return http.post('/users', user);
}

/**
 * @description: 用户登录
 * @param {TUser} user
 * @return {*}
 */
export function UserLogin<T>(user: TUser): Promise<T> {
  return http.post('/login/login', user);
}