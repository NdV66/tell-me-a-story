import { useMemo } from 'react';
import { CssBaseline, ThemeProvider, createTheme, PaletteOptions } from '@mui/material';
import { HomePage } from 'pages/HomePage';
import { AppNavbar, useSettingsContext } from 'views';
import { homePageViewModel } from 'modelsBuilder';

const useMainPage = () => {
  const { theme } = useSettingsContext();
  const muiTheme = useMemo(() => {
    const palette: PaletteOptions = {
      mode: theme.name,
      primary: { main: theme.primary },
      secondary: { main: theme.secondary },
      success: { main: theme.success },
    };

    return createTheme({
      palette,
      //   components: {
      //     MuiAppBar: {
      //       styleOverrides: {
      //         root: {
      //           background: theme.primary,
      //         },
      //       },
      //     },
      //   },
    });
  }, [theme]);

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
        <HomePage viewModel={homePageViewModel} />
      </main>
    </ThemeProvider>
  );
};
