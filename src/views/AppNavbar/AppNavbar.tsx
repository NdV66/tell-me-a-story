import { AppBar, Toolbar, Typography } from '@mui/material';
import { useSettingsContext } from '../SettingContext';
import { ThemeSwitch } from './ThemeSwitch';

const useAppNavbar = () => {
  const { changeAppTheme, ...settingContext } = useSettingsContext();

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    changeAppTheme(checked);
  };

  return {
    ...settingContext,
    handleThemeChange,
  };
};

export const AppNavbar = () => {
  const { theme, isDefaultAppTheme, handleThemeChange, translations } = useAppNavbar();

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {translations.appName}
        </Typography>

        <ThemeSwitch
          checked={isDefaultAppTheme}
          onChange={handleThemeChange}
          label={translations.themeChange}
          theme={theme}
        />
      </Toolbar>
    </AppBar>
  );
};
