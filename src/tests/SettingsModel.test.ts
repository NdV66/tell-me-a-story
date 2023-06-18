import { TRANSLATIONS_EN, TRANSLATIONS_PL } from 'data';
import { ICookiesManager, SettingsModel } from 'models';
import { EAppLangs, EAppTheme, TAppTheme } from 'types';

const defaultLang = EAppLangs.EN;
const defaultTheme = EAppTheme.DARK;

const darkMock = { name: 'dark' } as TAppTheme;
const lightMock = { name: 'light' } as TAppTheme;

const mappedTranslationsMock = new Map([
  [EAppLangs.EN, TRANSLATIONS_EN],
  [EAppLangs.PL, TRANSLATIONS_PL],
]);

const mappedThemesMock = new Map([
  [EAppTheme.LIGHT, lightMock],
  [EAppTheme.DARK, darkMock],
]);

const cookiesManagerMock: ICookiesManager = {
  setAppLangCookie: jest.fn(),
  setAppThemeCookie: jest.fn(),
  appLang: EAppLangs.EN,
  appTheme: EAppTheme.DARK,
};

describe('SettingsModel', () => {
  let model: SettingsModel;

  beforeEach(() => {
    model = new SettingsModel(
      defaultLang,
      defaultTheme,
      mappedTranslationsMock,
      mappedThemesMock,
      cookiesManagerMock,
    );
  });

  test('Should get default lang, when data from cookies are empty', () => {
    const lang = model.lang;
    cookiesManagerMock.appLang = undefined;

    expect(lang).toBe(defaultLang);
  });

  test('Should set default appTheme', () => {
    const appTheme = model.appTheme;
    cookiesManagerMock.appTheme = undefined;

    expect(appTheme).toBe(defaultTheme);
  });

  test('Should change lang', () => {
    const newLang = EAppLangs.PL;
    model.lang = newLang;

    expect(cookiesManagerMock.setAppLangCookie).toBeCalledTimes(1);
    expect(cookiesManagerMock.setAppLangCookie).toBeCalledWith(newLang);
  });

  test('Should change appTheme', () => {
    const newTheme = EAppTheme.LIGHT;
    model.appTheme = newTheme;

    expect(cookiesManagerMock.setAppThemeCookie).toBeCalledTimes(1);
    expect(cookiesManagerMock.setAppThemeCookie).toBeCalledWith(newTheme);
  });

  test('Should get translations based on a current lang', () => {
    cookiesManagerMock.appLang = EAppLangs.PL;
    expect(model.translations).toEqual(TRANSLATIONS_PL);
  });

  test('Should get theme based on a current theme', () => {
    cookiesManagerMock.appTheme = EAppTheme.LIGHT;
    expect(model.theme).toBe(lightMock);
  });
});
