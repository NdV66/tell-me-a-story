import {
  APP_ERRORS,
  DARK_THEME,
  ICONS_SET,
  LIGHT_THEME,
  PREFIX_ICON,
  TRANSLATIONS_EN,
  TRANSLATIONS_PL,
} from 'data';
import {
  AnyArrayManager,
  CookiesManager,
  IconsManager,
  SettingsModel,
  StoryTellerModel,
} from 'models';
import { EAppLangs, EAppTheme } from 'types';
import { HomePageViewModel, SettingsViewModel } from 'viewModels';

const ENV = {
  lang: EAppLangs.EN,
  theme: EAppTheme.DARK,

  mappedTranslations: new Map([
    [EAppLangs.EN, TRANSLATIONS_EN],
    [EAppLangs.PL, TRANSLATIONS_PL],
  ]),
  mappedThemes: new Map([
    [EAppTheme.DARK, DARK_THEME],
    [EAppTheme.LIGHT, LIGHT_THEME],
  ]),
};

const cookiesManager = new CookiesManager();
const anyArrayManager = new AnyArrayManager();
const iconsManager = new IconsManager(PREFIX_ICON, anyArrayManager, ICONS_SET);
const settingModel = new SettingsModel(
  ENV.lang,
  ENV.theme,
  ENV.mappedTranslations,
  ENV.mappedThemes,
  cookiesManager,
);

const storyTellerModel = new StoryTellerModel(iconsManager, APP_ERRORS);

export const settingViewModel = new SettingsViewModel(settingModel);
export const homePageViewModel = new HomePageViewModel(storyTellerModel);
