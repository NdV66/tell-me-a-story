import { EAppLangs, TTranslations } from 'types';

export interface ISettingsModel {
  translations: TTranslations;
  lang: EAppLangs;
}

export class SettingsModel implements ISettingsModel {
  private _translations: Map<EAppLangs, TTranslations>;

  constructor(
    private _lang: EAppLangs,
    enTranslations: TTranslations,
    plTranslations: TTranslations,
  ) {
    this._translations = new Map([
      [EAppLangs.EN, enTranslations],
      [EAppLangs.PL, plTranslations],
    ]);
  }

  set lang(data: EAppLangs) {
    this._lang = data;
  }

  get lang() {
    return this._lang;
  }

  get translations() {
    return this._translations.get(this.lang)!!;
  }
}
