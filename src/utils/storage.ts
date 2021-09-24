/**
 * @description: 获取Token
 * @param {string} key
 * @return {*}
 */
export function getToken(key: string): string | null {
  return sessionStorage.getItem(key);
}

/**
 * @description: 设置Token
 * @param {string} key
 * @param {string} value
 * @return {*}
 */
export function setToken(key: string, value: string): void {
  return sessionStorage.setItem(key, value);
}

/**
 * @description: 移除Token
 * @param {string} key
 * @return {*}
 */
export function removeToken(key: string): void {
  return sessionStorage.removeItem(key);
}
