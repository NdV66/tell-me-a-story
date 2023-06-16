import { useMemo } from 'react';
import { CssBaseline, ThemeProvider, createTheme, PaletteOptions } from '@mui/material';
import { HomePage } from 'pages/HomePage';
import { AppNavbar, useSettingsContext } from 'views';
//#382d72 dark
// #e5ccf4 pink

const useMainPage = () => {
  const { theme } = useSettingsContext();
  //   const palette = use

  const palette: PaletteOptions = {
    mode: theme.name,
    primary: { main: theme.primary },
    secondary: { main: theme.secondary },
    success: { main: theme.success },
  };

  const muiTheme = createTheme({ palette });

  console.log(palette.mode);

  return { muiTheme };
};

export const MainPage = () => {
  const { muiTheme } = useMainPage();

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />

      <header>
        <AppNavbar />
      </header>

      <main>
        <HomePage />
      </main>
    </ThemeProvider>
  );
};
