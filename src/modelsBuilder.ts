import { PLAYERS_ICONS, PREFIX_ICON } from 'data';
import { IconsManager, StoryTellerModel } from 'models';

export const iconsManager = new IconsManager(PREFIX_ICON, PLAYERS_ICONS);
export const storyTellerModel = new StoryTellerModel(iconsManager);
