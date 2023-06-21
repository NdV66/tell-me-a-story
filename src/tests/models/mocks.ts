import { PREFIX_ICON } from 'data';
import { IAnyArrayManager, IIconsManager } from 'models';
import { EStoryCategory, TAppErrors, TIconsSet } from 'types';

export const anyArrayManagerMock: IAnyArrayManager = {
  shuffle: jest.fn(),
};

export const prefixIconMock = 'mock-';
export const playersIconsMock = ['mock-icon', 'other-mock-icon', 'other-other-mock-icon'];
export const iconsSetMock: TIconsSet = {
  [EStoryCategory.PLAYER]: playersIconsMock,
};

export const iconsManagerMock: IIconsManager = {
  getIconsSetPerCategory: jest.fn(),
  iconPrefix: PREFIX_ICON,
};

export const errorsMock: TAppErrors = {
  OUT_OF_RANGE: new Error('Out of range'),
};
