import { IAnyArrayManager, IIconsManager, IconsManager } from 'models';
import { EStoryCategory, TIconsSet } from 'types';

const prefixIconMock = 'mock-';
const playersIconsMock = ['mock-icon'];
const iconsSetMock: TIconsSet = {
  [EStoryCategory.PLAYER]: playersIconsMock,
};

const anyArrayManagerMock: IAnyArrayManager = {
  shuffle: jest.fn(),
};

describe('IconsManager', () => {
  let manager: IIconsManager;

  beforeEach(() => {
    manager = new IconsManager(prefixIconMock, anyArrayManagerMock, iconsSetMock);
  });

  test('Should return correct prefix', () => {
    expect(manager.iconPrefix).toBe(prefixIconMock);
  });

  test('Should return correct (shuffled) icons', () => {
    anyArrayManagerMock.shuffle = jest.fn().mockReturnValue(playersIconsMock);
    const result = manager.getIconsSetPerCategory(EStoryCategory.PLAYER);

    expect(result).toEqual(playersIconsMock);
    expect(anyArrayManagerMock.shuffle).toHaveBeenCalledTimes(1);
    expect(anyArrayManagerMock.shuffle).toHaveBeenCalledWith(playersIconsMock);
  });
});
