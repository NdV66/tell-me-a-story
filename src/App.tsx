import { settingViewModel } from 'modelsBuilder';
import { EAppTheme } from 'types';
import { SettingContextWrapper, MainPage } from 'views';

export const App = () => (
  <SettingContextWrapper
    settingsViewModel={settingViewModel}
    defaultAppTheme={EAppTheme.DARK}
    otherAppTheme={EAppTheme.LIGHT}
  >
    <MainPage />
  </SettingContextWrapper>
);
