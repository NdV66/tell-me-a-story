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

const cookiesManagerMock: ICookiesManager = {} as any; //TODO

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

  test('Should set default lang', () => {
    expect(model.lang).toBe(defaultLang);
  });

  test('Should change lang', () => {
    const newLang = EAppLangs.PL;
    model.lang = newLang;

    expect(model.lang).toBe(newLang);
  });

  test('Should get translations based on a current lang', () => {
    model.lang = EAppLangs.PL;
    expect(model.translations).toEqual(TRANSLATIONS_PL);
  });

  test('Should get theme based on a current theme', () => {
    model.appTheme = EAppTheme.LIGHT;
    expect(model.theme).toBe(lightMock);
  });
});
