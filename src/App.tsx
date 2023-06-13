import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { settingViewModel } from 'modelsBuilder';
import { HomePage } from 'pages/HomePage';
import { AppNavbar, SettingContextWrapper } from 'views';

const defaultTheme = createTheme();

export const App = () => {
  return (
    <SettingContextWrapper settingsViewModel={settingViewModel}>
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
