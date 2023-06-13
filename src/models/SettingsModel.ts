import { EAppLangs, EAppTheme, TAppTheme, TTranslations } from 'types';

export interface ISettingsModel {
  translations: TTranslations;
  theme: TAppTheme;
  lang: EAppLangs;
  appTheme: EAppTheme;
}

export class SettingsModel implements ISettingsModel {
  constructor(
    public lang: EAppLangs,
    public appTheme: EAppTheme,
    private _translations: Map<EAppLangs, TTranslations>,
    private _themes: Map<EAppTheme, TAppTheme>,
  ) {}

  get translations() {
    return this._translations.get(this.lang)!!;
  }

  get theme() {
    return this._themes.get(this.appTheme)!!;
  }
}
