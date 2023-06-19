import { AppBar, Toolbar, Typography } from '@mui/material';
import { useSettingsContext } from '../SettingContext';
import { ThemeSwitch } from './ThemeSwitch';
import { LangSelector } from './LangSelector';

export const AppNavbar = () => {
  const {
    theme,
    isDefaultAppTheme,
    changeAppTheme,
    translations,
    changeLang,
    appLang,
    availableTranslations,
  } = useSettingsContext();

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {translations.appName}
        </Typography>

        <ThemeSwitch checked={isDefaultAppTheme} onChange={changeAppTheme} theme={theme} />
        <LangSelector onChange={changeLang} value={appLang} values={availableTranslations} />
      </Toolbar>
    </AppBar>
  );
};
