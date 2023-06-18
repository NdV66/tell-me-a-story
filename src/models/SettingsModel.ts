import { EAppLangs, EAppTheme, TAppTheme, TTranslations } from 'types';
import { ICookiesManager } from './CookiesManager';

export interface ISettingsModel {
  translations: TTranslations;
  theme: TAppTheme;
  lang: EAppLangs;
  appTheme: EAppTheme;
}

export class SettingsModel implements ISettingsModel {
  constructor(
    private _defaultLang: EAppLangs,
    private _defaultAppTheme: EAppTheme,
    private _translations: Map<EAppLangs, TTranslations>,
    private _themes: Map<EAppTheme, TAppTheme>,
    private _cookiesManager: ICookiesManager,
  ) {}

  set lang(data: EAppLangs) {
    this._cookiesManager.setAppLangCookie(data);
  }

  get lang() {
    return this._cookiesManager.appLang || this._defaultLang;
  }

  set appTheme(data: EAppTheme) {
    this._cookiesManager.setAppThemeCookie(data);
  }

  get appTheme() {
    return this._cookiesManager.appTheme || this._defaultAppTheme;
  }

  get translations() {
    return this._translations.get(this.lang)!!;
  }

  get theme() {
    return this._themes.get(this.appTheme)!!;
  }
}
