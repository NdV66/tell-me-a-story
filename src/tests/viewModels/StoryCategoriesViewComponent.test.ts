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
    iconsManagerMock.getCategoriesAmount = jest.fn().mockReturnValue(defaultCategoriesLength);
    viewModel = new StoryCategoriesViewComponent(iconsManagerMock, diceSettingsMock);
    testScheduler = getTestScheduler();
  });

  test('Should set default values on enter', () => {
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
});
