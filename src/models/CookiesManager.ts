import Cookies from 'js-cookie';
import { EAppLangs, EAppTheme, ECookieKeys } from 'types';

export interface ICookiesManager {
  appTheme?: EAppTheme;
  appLang?: EAppLangs;

  setAppThemeCookie: (theme: EAppTheme) => void;
  setAppLangCookie: (lang: EAppLangs) => void;
}

export class CookiesManager implements ICookiesManager {
  public setAppThemeCookie(theme: EAppTheme) {
    Cookies.set(ECookieKeys.THEME, theme);
  }

  public setAppLangCookie(lang: EAppLangs) {
    Cookies.set(ECookieKeys.LANG, lang);
  }

  get appTheme() {
    return Cookies.get(ECookieKeys.THEME) as EAppTheme;
  }

  get appLang() {
    return Cookies.get(ECookieKeys.LANG) as EAppLangs;
  }
}
