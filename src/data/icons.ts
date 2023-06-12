import { EStoryCategory, TIconsSet } from 'types';

export const PREFIX_ICON = 'ra-';

const PLAYERS_ICONS = ['aura', 'monster-skull', 'player-despair', 'player-pain'];

export const ICONS_SET: TIconsSet = {
  [EStoryCategory.PLAYER]: PLAYERS_ICONS,
};
