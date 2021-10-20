import { App } from 'vue';
import { createI18n, I18n } from 'vue-i18n';
import zhCN from '@/locales/zhCN';
import enUS from '@/locales/enUS';

export const loadedLanguages = ['zh-CN', 'en-US']; // 我们的预装默认语言

const messages = {
  'zh-CN': {
    ...zhCN,
  },
  'en-US': {
    ...enUS,
  },
};
/**
 * @description: 初始化国际化
 * @param {*}
 * @return {*}
 */
const i18n = createI18n<false>({
  legacy: false,
  locale: 'zh-CN',
  fallbackLocale: 'en-US',
  messages: messages,
});

export function setI18nLanguage(locale: string): void {
  i18n.global.locale.value = locale;

  /**
   * NOTE:
   * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
   * The following is an example for axios.
   *
   * axios.defaults.headers.common['Accept-Language'] = locale
   */
  document.querySelector('html')?.setAttribute('lang', locale);
}
export async function loadLanguageAsync(locale: string): Promise<void> {
  // 如果语言相同
  if (i18n.global.locale.value === locale) {
    return Promise.resolve(setI18nLanguage(locale));
  }

  // 如果语言已经加载
  if (loadedLanguages.includes(locale)) {
    return Promise.resolve(setI18nLanguage(locale));
  }

  // 如果尚未加载语言
  const messages = await import(
    /* webpackChunkName: "locale-[request]" */ `../../locales/${locale}.json`
  );
  i18n.global.setLocaleMessage(locale, messages.default);
}
/**
 * @description: 获取翻译字段
 * @param {string} text
 * @return {*}
 */
export function getTranslate(text: string | number): string {
  return i18n.global.t(text);
}

/**
 * @description: 获取当前语言
 * @param {*}
 * @return {*}
 */
export function getLanguage(): string {
  return i18n.global.locale.value;
}

/**
 * @description: 挂载国际化
 * @param {App} app
 * @return {*}
 */

export function setupI18n(app: App): I18n {
  app.use(i18n);
  return i18n;
}
export default i18n.install;
