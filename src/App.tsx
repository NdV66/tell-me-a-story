import { CssBaseline, ThemeProvider, createTheme, PaletteOptions } from '@mui/material';
import { settingViewModel } from 'modelsBuilder';
import { HomePage } from 'pages/HomePage';
import { EAppTheme } from 'types';
import { AppNavbar, SettingContextWrapper } from 'views';
//#382d72 dark
// #e5ccf4 pink

const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: '#5c509c',
  },
  secondary: {
    main: '#a080e1',
  },
  success: {
    main: '#b7c2c6',
  },
};
const lightTheme = createTheme({ palette: lightPalette }); //TODO change theme

export const App = () => {
  return (
    <SettingContextWrapper
      settingsViewModel={settingViewModel}
      defaultAppTheme={EAppTheme.DARK}
      otherAppTheme={EAppTheme.LIGHT}
    >
      <ThemeProvider theme={lightTheme}>
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
