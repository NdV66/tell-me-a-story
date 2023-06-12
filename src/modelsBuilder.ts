import { APP_ERRORS, ICONS_SET, PREFIX_ICON, TRANSLATIONS_EN, TRANSLATIONS_PL } from 'data';
import { AnyArrayManager, IconsManager, SettingsModel, StoryTellerModel } from 'models';
import { EAppLangs } from 'types';
import { SettingsViewModel } from 'viewModels';

const anyArrayManager = new AnyArrayManager();
const iconsManager = new IconsManager(PREFIX_ICON, anyArrayManager, ICONS_SET);
const settingModel = new SettingsModel(EAppLangs.EN, TRANSLATIONS_EN, TRANSLATIONS_PL);

export const settingViewModel = new SettingsViewModel(settingModel);

export const storyTellerModel = new StoryTellerModel(iconsManager, APP_ERRORS);
