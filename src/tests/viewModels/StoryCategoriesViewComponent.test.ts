import { TestScheduler } from 'rxjs/testing';
import { getTestScheduler } from 'tests/helpers';
import { diceSettingsMock, iconsManagerMock } from 'tests/mocks';
import { EStoryCategory } from 'types';
import { StoryCategoriesViewComponent } from 'viewModels';

const defaultCategoriesLength = 6;

describe('StoryCategoriesViewComponent', () => {
  let viewModel: StoryCategoriesViewComponent;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = getTestScheduler();
    viewModel = new StoryCategoriesViewComponent(iconsManagerMock, diceSettingsMock);
  });

  test('Should set default values on enter', () => {
    iconsManagerMock.getCategoriesAmount = jest.fn().mockReturnValue(defaultCategoriesLength);
    viewModel = new StoryCategoriesViewComponent(iconsManagerMock, diceSettingsMock);

    testScheduler.run(({ expectObservable }) => {
      expectObservable(viewModel.currentCategoriesLength$).toBe('a', {
        a: defaultCategoriesLength,
      });
      expectObservable(viewModel.currentCategories$).toBe('a', {
        a: diceSettingsMock.defaultCategoriesKeys,
      });
    });
  });

  test('_changeCurrentCategoriesLengthSubscribe() should update categories length, when categories are changed', () => {
    const nextCategoriesLength = 21;
    const nextCategories = [EStoryCategory.CREATURES, EStoryCategory.FOOD];

    iconsManagerMock.getCategoriesAmount = jest
      .fn()
      .mockReturnValueOnce(defaultCategoriesLength)
      .mockReturnValueOnce(nextCategoriesLength);
    viewModel = new StoryCategoriesViewComponent(iconsManagerMock, diceSettingsMock);

    testScheduler.run(({ expectObservable, cold }) => {
      expectObservable(viewModel.currentCategoriesLength$).toBe('ab', {
        a: defaultCategoriesLength,
        b: nextCategoriesLength,
      });

      expectObservable(viewModel.currentCategories$).toBe('ab', {
        a: diceSettingsMock.defaultCategoriesKeys,
        b: nextCategories,
      });

      cold('-b').subscribe(() => {
        viewModel['_currentCategories$'].next(nextCategories);
      });
    });
  });

  describe('_areCategoriesTheSame()', () => {
    test('Should be false, when categories have different length', async () => {
      const nextCategories = [
        EStoryCategory.CREATURES,
        EStoryCategory.FOOD,
        EStoryCategory.MILITARY,
      ];

      const result = await viewModel['_areCategoriesTheSame'](nextCategories);
      expect(result).toBe(false);
    });

    test('Should be false, when categories are 100% different, but have the same length', async () => {
      const nextCategories = [EStoryCategory.FOOD, EStoryCategory.MILITARY];

      const result = await viewModel['_areCategoriesTheSame'](nextCategories);
      expect(result).toBe(false);
    });

    test('Should be true, when categories are 100% the same', async () => {
      const result = await viewModel['_areCategoriesTheSame'](
        diceSettingsMock.defaultCategoriesKeys,
      );
      expect(result).toBe(true);
    });
  });

  describe('changeCategories()', () => {
    const nextCategories = [EStoryCategory.CREATURES, EStoryCategory.FOOD];

    test('Should not update, when categories are the same', async () => {
      const areCategoriesTheSameMock = jest.fn().mockResolvedValue(true);
      viewModel = new StoryCategoriesViewComponent(iconsManagerMock, diceSettingsMock);
      viewModel['_areCategoriesTheSame'] = areCategoriesTheSameMock;
      const nextSpy = jest.spyOn(viewModel['_currentCategories$'], 'next');

      await viewModel.changeCategories(nextCategories);

      expect(areCategoriesTheSameMock).toHaveBeenCalledTimes(1);
      expect(nextSpy).not.toHaveBeenCalled();
    });

    test('Should not update, when categories are empty', async () => {
      const areCategoriesTheSameMock = jest.fn().mockResolvedValue(false);
      viewModel = new StoryCategoriesViewComponent(iconsManagerMock, diceSettingsMock);
      viewModel['_areCategoriesTheSame'] = areCategoriesTheSameMock;
      const nextSpy = jest.spyOn(viewModel['_currentCategories$'], 'next');

      await viewModel.changeCategories([]);

      expect(areCategoriesTheSameMock).toHaveBeenCalledTimes(1);
      expect(nextSpy).not.toHaveBeenCalled();
    });

    test('Should change categories (and update its icons length), when categories are not the same and categories list is not empty', () => {
      const nextCategoriesLength = 21;
      const areCategoriesTheSameMock = jest.fn().mockResolvedValue(false);
      iconsManagerMock.getCategoriesAmount = jest
        .fn()
        .mockReturnValueOnce(defaultCategoriesLength)
        .mockReturnValueOnce(nextCategoriesLength);
      viewModel = new StoryCategoriesViewComponent(iconsManagerMock, diceSettingsMock);
      viewModel['_areCategoriesTheSame'] = areCategoriesTheSameMock;
      const nextSpy = jest.spyOn(viewModel['_currentCategories$'], 'next');

      testScheduler.run(async ({ expectObservable }) => {
        await viewModel.changeCategories(nextCategories);

        expectObservable(viewModel.currentCategories$).toBe('ab', {
          a: diceSettingsMock.defaultCategoriesKeys,
          b: nextCategories,
        });

        expectObservable(viewModel.currentCategoriesLength$).toBe('ab', {
          a: defaultCategoriesLength,
          b: nextCategoriesLength,
        });

        expect(areCategoriesTheSameMock).toHaveBeenCalledTimes(1);
        expect(areCategoriesTheSameMock).toHaveBeenLastCalledWith(nextCategories);
        expect(nextSpy).toHaveBeenCalledTimes(1);
        expect(nextSpy).toHaveBeenCalledWith(nextCategories);
      });
    });
  });
});
