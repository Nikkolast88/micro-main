/**
 * 获取 theme 对象
 * @param cssValue --el-color-primary
 * @returns string
 */
export function useGetCssVar(cssValue: string) {
  const el = document.documentElement;
  return getComputedStyle(el).getPropertyValue(cssValue);
}

export function useSetCssVar(cssValue: string, value: string) {
  const el = document.documentElement;
  el.style.setProperty(cssValue, value);
}
