import { APP_ERRORS, ICONS_SET, PREFIX_ICON, TRANSLATIONS_EN, TRANSLATIONS_PL } from 'data';
import { AnyArrayManager, IconsManager, SettingsModel, StoryTellerModel } from 'models';
import { EAppLangs, EAppTheme, TAppTheme } from 'types';
import { SettingsViewModel } from 'viewModels';

const LIGHT: TAppTheme = { name: 'light' };
const DARK: TAppTheme = { name: 'dark' };

const ENV = {
  lang: EAppLangs.EN,
  theme: EAppTheme.DARK,

  mappedTranslations: new Map([
    [EAppLangs.EN, TRANSLATIONS_EN],
    [EAppLangs.PL, TRANSLATIONS_PL],
  ]),
  mappedThemes: new Map([
    [EAppTheme.DARK, DARK],
    [EAppTheme.LIGHT, LIGHT],
  ]),
};

const anyArrayManager = new AnyArrayManager();
const iconsManager = new IconsManager(PREFIX_ICON, anyArrayManager, ICONS_SET);
const settingModel = new SettingsModel(
  ENV.lang,
  ENV.theme,
  ENV.mappedTranslations,
  ENV.mappedThemes,
);

export const settingViewModel = new SettingsViewModel(settingModel);

export const storyTellerModel = new StoryTellerModel(iconsManager, APP_ERRORS);
