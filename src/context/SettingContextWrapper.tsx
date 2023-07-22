import { PropsWithChildren, useContext, useEffect } from 'react';
import { useStateObservable } from 'tools';
import { EAppTheme } from 'types';
import { ISettingsViewModel } from 'viewModels/SettingsViewModel';
import { SettingContext } from './SettingContext';

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
