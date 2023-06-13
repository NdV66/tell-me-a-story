import { AppBar, Toolbar, Typography, Switch } from '@mui/material';
import { useSettingsContext } from '../SettingContext';

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
  const { theme, isDefaultAppTheme, handleThemeChange } = useAppNavbar();

  console.log(theme);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          News
        </Typography>

        <Switch
          checked={isDefaultAppTheme}
          onChange={handleThemeChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </Toolbar>
    </AppBar>
  );
};
