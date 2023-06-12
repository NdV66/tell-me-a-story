import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { HomePage } from 'pages/HomePage';
import { AppNavbar } from 'views';

const defaultTheme = createTheme();

export const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
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
