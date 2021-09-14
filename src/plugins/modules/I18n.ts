import { App, nextTick } from 'vue';
import { createI18n, I18n, Composer } from 'vue-i18n';
import zhCN from '@/locales/zh';

export const SUPPORT_LOCALES = ['en', 'zh'];

const messages = {
  zh: {
    ...zhCN,
  },
};
/**
 * @description: 初始化国际化
 * @param {*}
 * @return {*}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const i18n: any = createI18n({
  globalInjection: true,
  legacy: false,
  locale: 'zh', // 设定语言
  fallbackLocale: 'zh', // 翻译缺少时回退的语言
  messages: {
    zh: messages.zh,
  },
});
/**
 * @description: 挂载国际化
 * @param {App} app
 * @return {*}
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function setupI18n(app: App): I18n {
  app.use(i18n);
  return i18n;
}
export function setI18nLanguage(locale: string): void {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale;
  } else {
    (i18n.global as unknown as Composer).locale.value = locale;
  }
  /**
   * NOTE:
   * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
   * The following is an example for axios.
   *
   * axios.defaults.headers.common['Accept-Language'] = locale
   */
  (document.querySelector('html') as HTMLElement).setAttribute('lang', locale);
}
export async function loadLocaleMessages(
  i18n: I18n,
  locale: string,
): Promise<void> {
  // load locale messages
  const messages = await import(
    /* webpackChunkName: "locale-[request]" */ `@/locales/${locale}.ts`
  );

  // set locale and locale message
  i18n.global.setLocaleMessage(locale, messages.default);

  return nextTick();
}
export function getLanguage(): string {
  return '';
}

export default i18n;
