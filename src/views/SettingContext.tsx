import { createContext, PropsWithChildren } from 'react';
import { useStateObservable } from 'tools';
import { ISettingsViewModel } from 'viewModels/SettingsViewModel';

export type ISettingContext = {};

export const SettingContext = createContext({});

type Props = {
  settingsViewModel: ISettingsViewModel;
};

export const SettingContextWrapper = ({
  settingsViewModel,
  children,
}: PropsWithChildren<Props>) => {
  const theme = useStateObservable(settingsViewModel.translations$);
  const translations = useStateObservable(settingsViewModel.translations$);

  return <>{children}</>;
};
