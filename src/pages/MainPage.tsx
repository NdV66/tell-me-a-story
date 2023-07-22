import { useMemo } from 'react';
import { CssBaseline, ThemeProvider, createTheme, PaletteOptions } from '@mui/material';
import { HomePage } from 'pages/HomePage';
import {
  diceAmountViewComponent,
  diceAreaViewComponent,
  storyCategoriesViewComponent,
  homePageViewModel,
} from 'modelsBuilder';
import { FooterComponent } from './FooterComponent';
import { useSettingsContext } from 'context';
import { AppNavbarComponent } from './AppNavbarComponent';

export const useMainPage = () => {
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
        MuiOutlinedInput: {
          styleOverrides: {
            root: {
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.primary,
              },
            },
          },
        },
        MuiSelect: {
          defaultProps: {
            variant: 'outlined',
          },
          styleOverrides: {
            icon: {
              color: theme.primary,
            },
            outlined: {
              padding: '10px',
              fontSize: theme.fontSize * 0.9,
              backgroundColor: theme.background,
              color: theme.primary,
              borderColor: 'red',
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

      <header role="heading" aria-level={0}>
        <AppNavbarComponent />
      </header>

      <main role="main">
        <HomePage
          viewModel={homePageViewModel}
          diceAreaViewComponent={diceAreaViewComponent}
          diceAmountViewComponent={diceAmountViewComponent}
          storyCategoriesViewComponent={storyCategoriesViewComponent}
        />
      </main>

      <footer role="contentinfo">
        <FooterComponent />
      </footer>
    </ThemeProvider>
  );
};
