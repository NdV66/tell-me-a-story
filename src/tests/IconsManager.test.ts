import { IIconsManager, IconsManager } from 'models';
import { EStoryCategory } from 'types';
import { anyArrayManagerMock, prefixIconMock, iconsSetMock, playersIconsMock } from './mocks';

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
