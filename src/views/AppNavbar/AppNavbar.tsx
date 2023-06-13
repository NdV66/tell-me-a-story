import { AppBar, Toolbar, Typography, Switch } from '@mui/material';
import { useSettingsContext } from '../SettingContext';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export const AppNavbar = () => {
  const { changeAppTheme, theme } = useSettingsContext();

  console.log(theme);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          News
        </Typography>

        <Switch {...label} defaultChecked />
      </Toolbar>
    </AppBar>
  );
};
