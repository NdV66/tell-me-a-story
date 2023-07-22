import { createContext } from 'react';
import { EAppLangs, EAppTheme, TAppTheme, TAvailableTranslation, TTranslations } from 'types';

export type ISettingContext = {
  theme: TAppTheme;
  translations: TTranslations;
  appLang: EAppLangs;
  appTheme: EAppTheme;
  isDefaultAppTheme: boolean;
  availableTranslations: TAvailableTranslation[];

  changeLang: (lang: EAppLangs) => void;
  changeAppTheme: (value: boolean) => void;
};

export const SettingContext = createContext<ISettingContext>({} as ISettingContext);
