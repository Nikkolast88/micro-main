/**
 * @description: Http实体
 * @param {*}
 * @return {*}
 */
export interface HttpResponse<T> {
  status: number;
  msg: string;
  body: T
}
