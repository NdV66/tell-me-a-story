import { createContext, PropsWithChildren, useContext } from 'react';
import { useStateObservable } from 'tools';
import { EAppLangs, EAppTheme, TAppTheme, TTranslations } from 'types';
import { ISettingsViewModel } from 'viewModels/SettingsViewModel';

export type ISettingContext = {
  theme: TAppTheme;
  translations: TTranslations;

  changeLang: (lang: EAppLangs) => void;
  changeAppTheme: (theme: EAppTheme) => void;
};

export const SettingContext = createContext<ISettingContext>({} as ISettingContext);

type Props = {
  settingsViewModel: ISettingsViewModel;
};

export const SettingContextWrapper = ({
  settingsViewModel,
  children,
}: PropsWithChildren<Props>) => {
  const theme = useStateObservable(settingsViewModel.theme$);
  const translations = useStateObservable(settingsViewModel.translations$);

  if (!theme || !translations) return <div>LOADING...</div>;

  const value = {
    theme: theme!!,
    translations: translations!!,
    changeAppTheme: settingsViewModel.changeAppTheme,
    changeLang: settingsViewModel.changeLang,
  };

  return <SettingContext.Provider value={value}>{children}</SettingContext.Provider>;
};

export const useSettingsContext = () => useContext(SettingContext);
