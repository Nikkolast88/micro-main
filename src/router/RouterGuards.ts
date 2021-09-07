import { Router } from 'vue-router';
import { I18n } from 'vue-i18n';
import {
  loadLocaleMessages,
  SUPPORT_LOCALES,
  setI18nLanguage,
} from '@/plugins';
/**
 * @description: 路由守卫
 * @param {Router} router
 * @return {*}
 */
export function createRouterGuards(
  router: Router,
  i18n: I18n,
  locale: string,
): void {
  // 路由进入前
  router.beforeEach(async (to) => {
    const paramsLocale = to.params.locale as string;

    // use locale if paramsLocale is not in SUPPORT_LOCALES
    if (!SUPPORT_LOCALES.includes(paramsLocale)) {
      return `/${locale}`;
    }

    // load locale messages
    if (!i18n.global.availableLocales.includes(paramsLocale)) {
      await loadLocaleMessages(i18n, paramsLocale);
    }

    // set i18n language
    setI18nLanguage(paramsLocale);
  });
}
