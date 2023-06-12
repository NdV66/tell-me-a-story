import { APP_ERRORS, ICONS_SET, PREFIX_ICON } from 'data';
import { AnyArrayManager, IconsManager, StoryTellerModel } from 'models';

const anyArrayManager = new AnyArrayManager();
const iconsManager = new IconsManager(PREFIX_ICON, anyArrayManager, ICONS_SET);

export const storyTellerModel = new StoryTellerModel(iconsManager, APP_ERRORS);
