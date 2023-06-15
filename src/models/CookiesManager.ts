import Cookies from 'js-cookie';
import { EAppLangs, EAppTheme, ECookieKeys } from 'types';

export interface ICookiesManager {
  theme?: EAppTheme;
  lang?: EAppLangs;

  setThemeCookie: (theme: EAppTheme) => void;
  setLangCookie: (lang: EAppLangs) => void;
}

export class CookiesManager implements ICookiesManager {
  public setThemeCookie(theme: EAppTheme) {
    Cookies.set(ECookieKeys.THEME, theme);
  }

  public setLangCookie(lang: EAppLangs) {
    Cookies.set(ECookieKeys.LANG, lang);
  }

  get theme() {
    return Cookies.get(ECookieKeys.THEME) as EAppTheme;
  }

  get lang() {
    return Cookies.get(ECookieKeys.LANG) as EAppLangs;
  }
}
