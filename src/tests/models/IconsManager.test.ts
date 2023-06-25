import { IIconsManager, IconsManager } from 'models';
import { EStoryCategory } from 'types';
import { anyArrayManagerMock, prefixIconMock, iconsSetMock } from '../mocks';

describe('IconsManager', () => {
  let manager: IIconsManager;

  beforeEach(() => {
    manager = new IconsManager(prefixIconMock, anyArrayManagerMock, iconsSetMock);
  });

  test('Should return correct prefix', () => {
    expect(manager.iconPrefix).toBe(prefixIconMock);
  });

  test('Should return correct icons', () => {
    anyArrayManagerMock.shuffle = jest.fn().mockReturnValue(iconsSetMock.player);
    const result = manager.getIconsSetPerCategory(EStoryCategory.PLAYER);

    expect(result).toEqual(iconsSetMock.player);
    expect(anyArrayManagerMock.shuffle).toHaveBeenCalledTimes(1);
    expect(anyArrayManagerMock.shuffle).toHaveBeenCalledWith(iconsSetMock.player);
  });

  test('Should get categories summary amount', () => {
    const expectedLength = iconsSetMock.player.length + iconsSetMock.bottles.length;

    const result = manager.getCategoriesAmount([EStoryCategory.PLAYER, EStoryCategory.BOTTLES]);
    expect(result).toBe(expectedLength);
  });
});
