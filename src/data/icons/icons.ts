import { EStoryCategory, TIconsSet } from 'types';
import { PLAYERS_ICONS } from './player';
import { BOTTLES_ICONS } from './bottles';
import { INVENTORY_ICONS } from './inventory';
import { CREATURES_ICONS } from './creatures';
import { DANGERS_ICONS } from './dangers';
import { MAGIC_ICONS } from './magic';
import { MILITARY_ICONS } from './military';
import { FOOD_ICONS } from './food';

export const PREFIX_ICON = 'ra-';

export const ICONS_SET: TIconsSet = {
  [EStoryCategory.PLAYER]: PLAYERS_ICONS,
  [EStoryCategory.BOTTLES]: BOTTLES_ICONS,
  [EStoryCategory.INVENTORY]: INVENTORY_ICONS,
  [EStoryCategory.CREATURES]: CREATURES_ICONS,
  [EStoryCategory.DANGERS]: DANGERS_ICONS,
  [EStoryCategory.MAGIC]: MAGIC_ICONS,
  [EStoryCategory.MILITARY]: MILITARY_ICONS,
  [EStoryCategory.FOOD]: FOOD_ICONS,
};
