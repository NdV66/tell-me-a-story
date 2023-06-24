import { ENV } from 'appEnv';
import { APP_ERRORS, ICONS_SET, PREFIX_ICON } from 'data';
import {
  AnyArrayManager,
  CookiesManager,
  IconsManager,
  SettingsModel,
  StoryTellerModel,
} from 'models';

import { DiceAreaViewComponent, HomePageViewModel, SettingsViewModel } from 'viewModels';
import { DiceAmountViewComponent } from 'viewModels/DiceAmountViewComponent';
import { DiceCategoriesViewComponent } from 'viewModels/DiceCategoriesViewComponent';

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

const storyTellerModel = new StoryTellerModel(iconsManager, APP_ERRORS, anyArrayManager);

export const diceAreaViewComponent = new DiceAreaViewComponent(storyTellerModel);
export const diceAmountViewComponent = new DiceAmountViewComponent(ENV.diceSettings);
export const diceCategoriesViewComponent = new DiceCategoriesViewComponent(
  iconsManager,
  ENV.diceSettings,
);

export const settingViewModel = new SettingsViewModel(settingModel);

//TODO it's not used, but it keep everything together- maybe use it in the context?
export const homePageViewModel = new HomePageViewModel(
  diceAreaViewComponent,
  diceAmountViewComponent,
  diceCategoriesViewComponent,
);
