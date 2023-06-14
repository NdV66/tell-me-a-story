import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { settingViewModel } from 'modelsBuilder';
import { HomePage } from 'pages/HomePage';
import { EAppTheme } from 'types';
import { AppNavbar, SettingContextWrapper } from 'views';

const defaultTheme = createTheme(); //TODO change theme

export const App = () => {
  return (
    <SettingContextWrapper
      settingsViewModel={settingViewModel}
      defaultAppTheme={EAppTheme.DARK}
      otherAppTheme={EAppTheme.LIGHT}
    >
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />

        <header>
          <AppNavbar />
        </header>

        <main>
          <HomePage />
        </main>
      </ThemeProvider>
    </SettingContextWrapper>
  );
};
