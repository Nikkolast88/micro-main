import { http } from '@/utils/http';

export type User = {
  id: string;
  name: string;
  avatar: string;
  email: string;
};

export const getUserInfo = async(user: User): Promise<User[]> => {
  return await http.post<User, User[]>('/users', user);
};
