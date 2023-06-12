import { ISettingsModel } from 'models';
import { BehaviorSubject, Observable } from 'rxjs';
import { EAppLangs, TTranslations } from 'types';

export interface ISettingsViewModel {
  lang$: Observable<EAppLangs>;
  translations$: Observable<TTranslations>;

  changeLang: (lang: EAppLangs) => void;
}

export class SettingsViewModel implements ISettingsViewModel {
  private _lang$: BehaviorSubject<EAppLangs>;
  private _translations$: BehaviorSubject<TTranslations>;

  constructor(private _settingModel: ISettingsModel) {
    this._lang$ = new BehaviorSubject(this._settingModel.lang);
    this._translations$ = new BehaviorSubject(this._settingModel.translations);

    this._subscribeToLang$();
  }

  private _subscribeToLang$() {
    this._lang$.subscribe((lang) => {
      this._settingModel.lang = lang;
      this._translations$.next(this._settingModel.translations);
    });
  }

  get translations$() {
    return this._translations$.asObservable();
  }

  get lang$() {
    return this._lang$.asObservable();
  }

  public changeLang(lang: EAppLangs) {
    this._lang$.next(lang);
  }
}
