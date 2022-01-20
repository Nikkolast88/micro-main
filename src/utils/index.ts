import { Icon } from '@icon-park/vue-next/lib/runtime';
import { h } from 'vue';
export function getEncodeStr(str: string): string {
  const A = 'Uog8X3DJl5tIdvxmWAfCuLYPH4cQbzM6BVkh2TOR7ENnKspaiw1rGjF9S0qyZe';
  if (!str || str == '') return '';
  let result = '';
  for (let i = 0; i < str.length; i++) {
    if (
      str.charAt(i).charCodeAt(0) <= '9'.charCodeAt(0) &&
      str.charAt(i).charCodeAt(0) >= '0'.charCodeAt(0)
    ) {
      result = result + A.charAt(Number(str.charAt(i)));
    } else if (
      str.charAt(i).charCodeAt(0) <= 'z'.charCodeAt(0) &&
      str.charAt(i).charCodeAt(0) >= 'a'.charCodeAt(0)
    ) {
      result = result + A.charAt(str.charAt(i).charCodeAt(0) - 97 + 10);
    } else if (
      str.charAt(i).charCodeAt(0) <= 'Z'.charCodeAt(0) &&
      str.charAt(i).charCodeAt(0) >= 'A'.charCodeAt(0)
    ) {
      result = result + A.charAt(str.charAt(i).charCodeAt(0) - 65 + 36);
    }
  }
  return result;
}

/**
 * 渲染vue组件，html字符串
 * @param icon Icon
 * @returns VNode
 */
export function renderIcon(icon: Icon) {
  return () => h(icon);
}
