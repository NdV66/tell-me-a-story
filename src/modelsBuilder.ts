import { ENV } from 'appEnv';
import { APP_ERRORS, ICONS_SET, PREFIX_ICON } from 'data';
import {
  AnyArrayManager,
  CookiesManager,
  IconsManager,
  SettingsModel,
  StoryTellerModel,
} from 'models';

import { HomePageViewModel, SettingsViewModel } from 'viewModels';

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
export const homePageViewModel = new HomePageViewModel(storyTellerModel, ENV.diceSettings);
