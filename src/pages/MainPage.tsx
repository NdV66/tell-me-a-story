import { useMemo } from 'react';
import { CssBaseline, ThemeProvider, createTheme, PaletteOptions } from '@mui/material';
import { HomePage } from 'pages/HomePage';
import { AppNavbar, useSettingsContext } from 'views';
import {
  diceAmountViewComponent,
  diceAreaViewComponent,
  storyCategoriesViewComponent,
  homePageViewModel,
} from 'modelsBuilder';
import { FooterPage } from './FooterPage';

const useMainPage = () => {
  const { theme } = useSettingsContext();

  const muiTheme = useMemo(() => {
    const palette: PaletteOptions = {
      mode: theme.name,
      primary: {
        main: theme.primary,
        contrastText: theme.background,
      },
      secondary: {
        main: theme.secondary,
        contrastText: theme.light,
      },
      background: {
        default: theme.background,
      },
    };

    return createTheme({
      typography: {
        fontSize: theme.fontSize,
      },
      palette,
      components: {
        MuiPaper: {
          styleOverrides: {
            root: {
              background: theme.primary,
              color: theme.background,
            },
          },
        },
        MuiMenuItem: {
          styleOverrides: {
            root: {
              fontSize: theme.fontSize * 0.94,
            },
          },
        },
        MuiSelect: {
          styleOverrides: {
            outlined: {
              padding: '10px',
              fontSize: theme.fontSize * 0.9,
              backgroundColor: theme.background,
              color: theme.primary,
            },
          },
        },
        MuiAppBar: {
          styleOverrides: {
            root: {
              background: theme.primary,
            },
          },
        },
      },
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
        <HomePage
          viewModel={homePageViewModel}
          diceAreaViewComponent={diceAreaViewComponent}
          diceAmountViewComponent={diceAmountViewComponent}
          storyCategoriesViewComponent={storyCategoriesViewComponent}
        />
      </main>

      <footer>
        <FooterPage />
      </footer>
    </ThemeProvider>
  );
};
