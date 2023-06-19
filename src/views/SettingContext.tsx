import { createContext, PropsWithChildren, useContext, useEffect } from 'react';
import { useStateObservable } from 'tools';
import { EAppLangs, EAppTheme, TAppTheme, TAvailableTranslation, TTranslations } from 'types';
import { ISettingsViewModel } from 'viewModels/SettingsViewModel';

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

type Props = {
  settingsViewModel: ISettingsViewModel;
  defaultAppTheme: EAppTheme;
  otherAppTheme: EAppTheme;
};

export const SettingContextWrapper = ({
  defaultAppTheme,
  otherAppTheme,
  settingsViewModel,
  children,
}: PropsWithChildren<Props>) => {
  const theme = useStateObservable(settingsViewModel.theme$);
  const translations = useStateObservable(settingsViewModel.translations$);
  const appLang = useStateObservable(settingsViewModel.appLang$);
  const appTheme = useStateObservable(settingsViewModel.appTheme$);

  useEffect(() => {
    settingsViewModel.setupFromCookies();
  }, [settingsViewModel]);

  if (!theme || !translations) return <div>LOADING...</div>;

  const changeAppTheme = (value: boolean) => {
    const theme = value ? defaultAppTheme : otherAppTheme;
    settingsViewModel.changeAppTheme(theme);
  };

  const value = {
    isDefaultAppTheme: appTheme === defaultAppTheme,
    appLang: appLang!!,
    appTheme: appTheme!!,
    theme: theme!!,
    translations: translations!!,
    changeAppTheme,
    changeLang: settingsViewModel.changeLang,
    availableTranslations: settingsViewModel.availableTranslations,
  };

  return <SettingContext.Provider value={value}>{children}</SettingContext.Provider>;
};

export const useSettingsContext = () => useContext(SettingContext);
