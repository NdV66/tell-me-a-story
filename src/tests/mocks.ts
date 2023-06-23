import { PREFIX_ICON } from 'data';
import { IAnyArrayManager, IIconsManager, IStoryTellerModel } from 'models';
import { EStoryCategory, TAppErrors, TDiceSettings, TIconsSet } from 'types';

export const anyArrayManagerMock: IAnyArrayManager = {
  shuffle: jest.fn(),
};

export const prefixIconMock = 'mock-';
export const iconsMock = ['mock-icon', 'other-mock-icon', 'other-other-mock-icon'];

export const playersIconsMock = [...iconsMock];

export const iconsSetMock: TIconsSet = {
  [EStoryCategory.PLAYER]: playersIconsMock,
  [EStoryCategory.BOTTLES]: ['mock-icon2', 'other-mock-icon2', 'other-other-mock-icon2'],
};

export const iconsManagerMock: IIconsManager = {
  getIconsSetPerCategory: jest.fn(),
  iconPrefix: PREFIX_ICON,
  getCategoriesAmount: jest.fn(),
};

export const diceSettingsMock: TDiceSettings = {
  defaultDiceAmount: 9,
  minDice: 3,
  stepDice: 3,
  maxThresholds: 5,
  categoriesKeys: Object.values(EStoryCategory),
  defaultCategoriesKeys: [EStoryCategory.PLAYER],
};

export const storyTellerMock: IStoryTellerModel = {
  tellAStory: jest.fn(),
};

export const errorsMock: TAppErrors = {
  OUT_OF_RANGE: new Error('Out of range'),
};
