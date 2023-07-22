import { ISettingsModel } from 'models';
import { BehaviorSubject, Observable } from 'rxjs';
import { EAppLangs, EAppTheme, TAppTheme, TAvailableTranslation, TTranslations } from 'types';

export interface ISettingsViewModel {
  translations$: Observable<TTranslations>;
  theme$: Observable<TAppTheme>;

  appTheme$: Observable<EAppTheme>;
  appLang$: Observable<EAppLangs>;

  changeLang: (lang: EAppLangs) => void;
  changeAppTheme: (theme: EAppTheme) => void;

  setupFromCookies: () => void;
  availableTranslations: TAvailableTranslation[];
}

export class SettingsViewModel implements ISettingsViewModel {
  private _appTheme$: BehaviorSubject<EAppTheme>;
  private _theme$: BehaviorSubject<TAppTheme>;
  private _appLang$: BehaviorSubject<EAppLangs>;
  private _translations$: BehaviorSubject<TTranslations>;

  constructor(private _settingModel: ISettingsModel) {
    this._appLang$ = new BehaviorSubject(this._settingModel.lang);
    this._translations$ = new BehaviorSubject(this._settingModel.translations);
    this._appTheme$ = new BehaviorSubject(this._settingModel.appTheme);
    this._theme$ = new BehaviorSubject(this._settingModel.theme);

    this._subscribeToLang$();
    this._subscribeToAppTheme$();
  }

  private _syncWithModel() {
    this._appLang$.next(this._settingModel.lang);
    this._appTheme$.next(this._settingModel.appTheme);
  }

  private _subscribeToLang$() {
    this._appLang$.subscribe((lang) => {
      this._settingModel.lang = lang;
      this._translations$.next(this._settingModel.translations);
    });
  }

  private _subscribeToAppTheme$() {
    this._appTheme$.subscribe((appTheme) => {
      this._settingModel.appTheme = appTheme;
      this._theme$.next(this._settingModel.theme);
    });
  }

  get translations$() {
    return this._translations$.asObservable();
  }

  get theme$() {
    return this._theme$.asObservable();
  }

  get appLang$() {
    return this._appLang$.asObservable();
  }

  get appTheme$() {
    return this._appTheme$.asObservable();
  }

  public changeLang = (lang: EAppLangs) => {
    this._appLang$.next(lang);
  };

  public changeAppTheme = (theme: EAppTheme) => {
    this._appTheme$.next(theme);
  };

  public setupFromCookies() {
    this._syncWithModel();
  }

  private _buildLangName(key: string) {
    const translations = this._settingModel.getTranslationsByLang((EAppLangs as any)[key]);
    return translations!!.lang;
  }

  get availableTranslations() {
    const keys = Object.keys(EAppLangs);

    return keys.map((key) => ({
      key: (EAppLangs as any)[key],
      value: this._buildLangName(key),
    }));
  }
}
