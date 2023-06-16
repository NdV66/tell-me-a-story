import { CssBaseline, ThemeProvider, createTheme, PaletteOptions } from '@mui/material';
import { HomePage } from 'pages/HomePage';
import { AppNavbar, useSettingsContext } from 'views';
//#382d72 dark
// #e5ccf4 pink

export const MainPage = () => {
  const { theme } = useSettingsContext();

  const lightPalette: PaletteOptions = {
    mode: theme.name,
    primary: { main: theme.primary },
    secondary: { main: theme.secondary },
    success: { main: theme.success },
  };

  const lightTheme = createTheme({ palette: lightPalette });

  return (
    <ThemeProvider theme={lightTheme}>
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
