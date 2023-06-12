import { createContext } from 'react';
import { useStateObservable } from 'tools';
import { ISettingsViewModel } from 'viewModels/SettingsViewModel';

export type ISettingContext = {};

export const SettingContext = createContext({});

type Props = {
  settingsViewModel: ISettingsViewModel;
};

export const SettingContextWrapper = ({ settingsViewModel }: Props) => {
  const translations = useStateObservable(settingsViewModel.translations$);

  return <></>;
};
