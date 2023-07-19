import { AppBar, Toolbar, Typography } from '@mui/material';

import { ThemeSwitch } from './ThemeSwitch';
import { LangSelector } from './LangSelector';
import { useSettingsContext } from 'context';
import { TEST_IDS } from 'data';

export const AppNavbarComponent = () => {
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
    <AppBar position="static" color="primary" data-testid={TEST_IDS.AppNavbarComponent}>
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
