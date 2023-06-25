import { StoryTellerModel } from 'models';
import { anyArrayManagerMock, errorsMock, iconsManagerMock, iconsSetMock } from '../mocks';
import { EStoryCategory } from 'types';

describe('StoryTellerModel', () => {
  let model: StoryTellerModel;

  beforeEach(() => {
    anyArrayManagerMock.shuffle = jest.fn().mockImplementation((icons) => icons);
    model = new StoryTellerModel(iconsManagerMock, errorsMock, anyArrayManagerMock);
  });

  describe('getIconsPerCategories()', () => {
    test('Should', () => {
      const expectedResult = [...iconsSetMock.bottles, ...iconsSetMock.player];
      iconsManagerMock.getIconsSetPerCategory = jest
        .fn()
        .mockReturnValueOnce(iconsSetMock.bottles)
        .mockReturnValueOnce(iconsSetMock.player);

      const result = model['getIconsPerCategories']([
        EStoryCategory.BOTTLES,
        EStoryCategory.PLAYER,
      ]);

      expect(new Set(result)).toEqual(new Set(expectedResult));
    });
  });

  describe('tellAStory()', () => {
    test('Should throw error, when icons amount is bigger than available icons', () => {
      const diceAmount = iconsSetMock.player.length + 2;
      iconsManagerMock.getIconsSetPerCategory = jest.fn().mockReturnValue(iconsSetMock.player);
      const callback = () => model.tellAStory([EStoryCategory.PLAYER], diceAmount);

      expect(callback).toThrow(errorsMock.OUT_OF_RANGE);
    });

    test('Should throw error, when icons amount is less than minimum', () => {
      const diceAmount = StoryTellerModel.MIN_AMOUNT - 1;
      iconsManagerMock.getIconsSetPerCategory = jest.fn().mockReturnValue(iconsSetMock.player);
      const callback = () => model.tellAStory([EStoryCategory.PLAYER], diceAmount);

      expect(callback).toThrow(errorsMock.OUT_OF_RANGE);
    });

    test('Should work correctly', () => {
      const diceAmount = iconsSetMock.player.length - 1;
      iconsManagerMock.getIconsSetPerCategory = jest.fn().mockReturnValue(iconsSetMock.player);
      const result = model.tellAStory([EStoryCategory.PLAYER], diceAmount);

      expect(result.length).toBe(diceAmount);
    });

    test('Should work correctly, when icons amount is equals available icons', () => {
      const diceAmount = iconsSetMock.player.length - 1;
      iconsManagerMock.getIconsSetPerCategory = jest.fn().mockReturnValue(iconsSetMock.player);
      const result = model.tellAStory([EStoryCategory.PLAYER], diceAmount);

      expect(result.length).toBe(diceAmount);
    });
  });
});
