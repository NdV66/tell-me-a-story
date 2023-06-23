import { StoryTellerModel } from 'models';
import { errorsMock, iconsManagerMock, iconsSetMock, playersIconsMock } from '../mocks';
import { EStoryCategory } from 'types';

describe('StoryTellerModel', () => {
  let model: StoryTellerModel;

  beforeEach(() => {
    model = new StoryTellerModel(iconsManagerMock, errorsMock);
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
      const diceAmount = playersIconsMock.length + 2;
      iconsManagerMock.getIconsSetPerCategory = jest.fn().mockReturnValue(playersIconsMock);
      const callback = () => model.tellAStory([EStoryCategory.PLAYER], diceAmount);

      expect(callback).toThrow(errorsMock.OUT_OF_RANGE);
    });

    test('Should throw error, when icons amount is less than minimum', () => {
      const diceAmount = StoryTellerModel.MIN_AMOUNT - 1;
      iconsManagerMock.getIconsSetPerCategory = jest.fn().mockReturnValue(playersIconsMock);
      const callback = () => model.tellAStory([EStoryCategory.PLAYER], diceAmount);

      expect(callback).toThrow(errorsMock.OUT_OF_RANGE);
    });

    test('Should work correctly', () => {
      const diceAmount = playersIconsMock.length - 1;
      iconsManagerMock.getIconsSetPerCategory = jest.fn().mockReturnValue(playersIconsMock);
      const result = model.tellAStory([EStoryCategory.PLAYER], diceAmount);

      expect(result.length).toBe(diceAmount);
    });

    test('Should work correctly, when icons amount is equals available icons', () => {
      const diceAmount = playersIconsMock.length - 1;
      iconsManagerMock.getIconsSetPerCategory = jest.fn().mockReturnValue(playersIconsMock);
      const result = model.tellAStory([EStoryCategory.PLAYER], diceAmount);

      expect(result.length).toBe(diceAmount);
    });
  });
});
