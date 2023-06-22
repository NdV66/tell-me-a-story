import { useMemo } from 'react';
import { CssBaseline, ThemeProvider, createTheme, PaletteOptions, Container } from '@mui/material';
import { HomePage } from 'pages/HomePage';
import { AppNavbar, useSettingsContext } from 'views';
import { homePageViewModel } from 'modelsBuilder';
import { FooterPage } from './FooterPage';

const useMainPage = () => {
  const { theme } = useSettingsContext();
  const muiTheme = useMemo(() => {
    const palette: PaletteOptions = {
      mode: theme.name,
      primary: { main: theme.primary },
      secondary: { main: theme.secondary },
      success: { main: theme.success },
      info: { main: theme.accent },
      background: { default: theme.background },
    };

    return createTheme({
      palette,
      components: {
        MuiPaper: {
          styleOverrides: {
            root: {
              background: theme.background,
            },
          },
        },
        MuiSelect: {
          styleOverrides: {
            outlined: {
              padding: '10px',
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
        <Container maxWidth="lg">
          <HomePage viewModel={homePageViewModel} />
        </Container>
      </main>

      <footer>
        <FooterPage />
      </footer>
    </ThemeProvider>
  );
};
