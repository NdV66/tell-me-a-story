import Cookies from 'js-cookie';
import { CookiesManager } from 'models';
import { EAppLangs, EAppTheme, ECookieKeys } from 'types';
jest.mock('js-cookie');

describe('CookiesManager', () => {
  let manager: CookiesManager;

  beforeEach(() => {
    manager = new CookiesManager();
  });

  test('Should set app theme', () => {
    const newTheme = EAppTheme.LIGHT;
    const spy = jest.spyOn(Cookies, 'set');
    manager.setAppThemeCookie(newTheme);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(ECookieKeys.THEME, newTheme);
  });

  test('Should set app lang', () => {
    const newLang = EAppLangs.PL;
    const spy = jest.spyOn(Cookies, 'set');
    manager.setAppLangCookie(newLang);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(ECookieKeys.LANG, newLang);
  });

  test('Should get current app theme', () => {
    const theme = EAppTheme.LIGHT;
    const spy = jest.spyOn(Cookies, 'get');
    spy.mockReturnValueOnce(theme as any);

    const result = manager.appTheme;

    expect(spy).toHaveBeenCalledTimes(1);
    expect(result).toEqual(theme);
  });

  test('Should get current app lang', () => {
    const lang = EAppLangs.PL;
    const spy = jest.spyOn(Cookies, 'get');
    spy.mockReturnValueOnce(lang as any);

    const result = manager.appLang;

    expect(spy).toHaveBeenCalledTimes(1);
    expect(result).toEqual(lang);
  });
});
