import { IAnyArrayManager } from 'models';
import { EStoryCategory, TIconsSet } from 'types';

export const anyArrayManagerMock: IAnyArrayManager = {
  shuffle: jest.fn(),
};

export const prefixIconMock = 'mock-';
export const playersIconsMock = ['mock-icon'];
export const iconsSetMock: TIconsSet = {
  [EStoryCategory.PLAYER]: playersIconsMock,
};
