import { http } from '@/utils/http';

export function UserLogin<T>(data: API.TUser): Promise<T> {
  return http.post<API.TUser, T>('/login/login', data);
}
