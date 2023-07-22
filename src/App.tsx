import { settingViewModel } from 'modelsBuilder';
import { EAppTheme } from 'types';
import { SettingContextWrapper } from 'context';
import { MainPage } from 'pages';

export const App = () => (
  <SettingContextWrapper
    settingsViewModel={settingViewModel}
    defaultAppTheme={EAppTheme.DARK}
    otherAppTheme={EAppTheme.LIGHT}
  >
    <MainPage />
  </SettingContextWrapper>
);
