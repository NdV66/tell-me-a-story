import { APP_ERRORS, ICONS_SET, PREFIX_ICON } from 'data';
import { IAnyArrayManager, IIconsManager, IStoryTellerModel } from 'models';
import { TestScheduler } from 'rxjs/testing';
import { EStoryCategory, TAppErrors, TDiceSettings, TIconsSet } from 'types';

export const anyArrayManagerMock: IAnyArrayManager = {
  shuffle: jest.fn(),
};

export const prefixIconMock = 'mock-';
export const iconsMock = [
  'mock-icon',
  'other-mock-icon',
  'other-other-mock-icon',
  'other-other-other-mock-icon',
  'other-other-other-other-mock-icon',
];

export const iconsSetMock: TIconsSet = ICONS_SET;

export const iconsManagerMock: IIconsManager = {
  getIconsSetPerCategory: jest.fn(),
  iconPrefix: PREFIX_ICON,
  getCategoriesAmount: jest.fn(),
};

export const diceSettingsMock: TDiceSettings = {
  minDice: 3,
  stepDice: 3,
  maxThresholds: 5,
  categoriesKeys: Object.values(EStoryCategory),
  defaultCategoriesKeys: [EStoryCategory.PLAYER],
  defaultCategoriesLength: iconsSetMock.player.length,
};

export const storyTellerMock: IStoryTellerModel = {
  tellAStory: jest.fn(),
};

export const errorsMock = APP_ERRORS;

export const getTestScheduler = () =>
  new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });
