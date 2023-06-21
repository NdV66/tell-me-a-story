import { StoryTellerModel } from 'models';
import { errorsMock, iconsManagerMock, playersIconsMock } from './mocks';
import { EStoryCategory } from 'types';

describe('StoryTellerModel', () => {
  let model: StoryTellerModel;

  beforeEach(() => {
    model = new StoryTellerModel(iconsManagerMock, errorsMock);
  });

  describe('tellAStory', () => {
    test('Should throw error, when icons amount is bigger than available icons', () => {
      const diceAmount = playersIconsMock.length + 2;
      iconsManagerMock.getIconsSetPerCategory = jest.fn().mockReturnValue(playersIconsMock);

      const callback = () => model.tellAStory(EStoryCategory.PLAYER, diceAmount);

      expect(callback).toThrow(errorsMock.OUT_OF_RANGE);
    });

    test('Should throw error, when icons amount is equals available icons', () => {
      const diceAmount = playersIconsMock.length;
      iconsManagerMock.getIconsSetPerCategory = jest.fn().mockReturnValue(playersIconsMock);

      const callback = () => model.tellAStory(EStoryCategory.PLAYER, diceAmount);

      expect(callback).toThrow(errorsMock.OUT_OF_RANGE);
    });

    test('Should throw error, when icons amount is less than minimum', () => {
      const diceAmount = StoryTellerModel.MIN_AMOUNT - 1;
      iconsManagerMock.getIconsSetPerCategory = jest.fn().mockReturnValue(playersIconsMock);

      const callback = () => model.tellAStory(EStoryCategory.PLAYER, diceAmount);

      expect(callback).toThrow(errorsMock.OUT_OF_RANGE);
    });

    test('Should work correctly', () => {
      const diceAmount = playersIconsMock.length - 1;
      iconsManagerMock.getIconsSetPerCategory = jest.fn().mockReturnValue(playersIconsMock);

      const result = model.tellAStory(EStoryCategory.PLAYER, diceAmount);

      expect(result.length).toBe(diceAmount);
    });
  });
});
