import { createContext, PropsWithChildren } from 'react';
import { useStateObservable } from 'tools';
import { EAppLangs, EAppTheme, TAppTheme, TTranslations } from 'types';
import { ISettingsViewModel } from 'viewModels/SettingsViewModel';

export type ISettingContext = {
  theme?: TAppTheme;
  translations?: TTranslations;

  changeLang: (lang: EAppLangs) => void;
  changeAppTheme: (theme: EAppTheme) => void;
};

export const SettingContext = createContext<ISettingContext>({
  changeLang: () => {},
  changeAppTheme: () => {},
});

type Props = {
  settingsViewModel: ISettingsViewModel;
};

export const SettingContextWrapper = ({
  settingsViewModel,
  children,
}: PropsWithChildren<Props>) => {
  const theme = useStateObservable(settingsViewModel.theme$);
  const translations = useStateObservable(settingsViewModel.translations$);

  const value = {
    theme,
    translations,
    changeAppTheme: settingsViewModel.changeAppTheme,
    changeLang: settingsViewModel.changeLang,
  };

  if (!theme || !translations) return <div>LOADING...</div>;

  return <SettingContext.Provider value={value}>{children}</SettingContext.Provider>;
};
