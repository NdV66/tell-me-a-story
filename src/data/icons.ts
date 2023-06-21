import { EStoryCategory, TIconsSet } from 'types';

export const PREFIX_ICON = 'ra-';

const PLAYERS_ICONS = [
  'aura',
  'monster-skull',
  'player-despair',
  'player-pain',
  'player-thunder-struck ',
  'aware',
  'muscle-fat',
  'double-team',
  'muscle-up',
  'player-king',
  'player-shot',
  'falling',
  'player',
  'player-lift',
  'player-teleport',
];

const BOTTLES_ICONS = [
  'bottle-vapors',
  'heart-bottle',
  'round-bottom-flask',
  'bottled-bolt',
  'corked-tube',
  'vial',
  'broken-bottle',
  'vase',
  'fizzing-flask',
  'bubbling-potion',
  'flask',
];

export const ICONS_SET: TIconsSet = {
  [EStoryCategory.PLAYER]: PLAYERS_ICONS,
  [EStoryCategory.BOTTLES]: BOTTLES_ICONS,
};
