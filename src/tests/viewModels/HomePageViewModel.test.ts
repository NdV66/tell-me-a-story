import { ReplaySubject } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { getTestScheduler } from 'tests/helpers';
import {
  diceAmountViewComponentMock,
  diceAreaViewComponentMock,
  storyCategoriesViewComponentMock,
} from 'tests/mocks';
import { EStoryCategory } from 'types';
import { HomePageViewModel } from 'viewModels';

const currentCategoriesMock = [EStoryCategory.BOTTLES, EStoryCategory.CREATURES];
const categoriesLengthMock = 8;

describe('HomePageViewModel', () => {
  let currentCategoriesLengthMock$: ReplaySubject<number>;
  let currentDiceAmount$: ReplaySubject<number>;
  let currentCategoriesMock$: ReplaySubject<EStoryCategory[]>;
  let viewModel: HomePageViewModel;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = getTestScheduler();

    currentCategoriesLengthMock$ = new ReplaySubject<number>();
    currentDiceAmount$ = new ReplaySubject<number>();
    currentCategoriesMock$ = new ReplaySubject<EStoryCategory[]>();

    storyCategoriesViewComponentMock.currentCategoriesLength$ = currentCategoriesLengthMock$;
    storyCategoriesViewComponentMock.currentCategories$ = currentCategoriesMock$;
    diceAmountViewComponentMock.currentDiceAmount$ = currentDiceAmount$;

    viewModel = new HomePageViewModel(
      diceAreaViewComponentMock,
      diceAmountViewComponentMock,
      storyCategoriesViewComponentMock,
    );
  });

  describe('_tellAStorySubscribe()', () => {
    test('Should tell a story (diceAmount < categoriesLength)', async () => {
      const currentDiceAmountMock = categoriesLengthMock - 2;

      await currentCategoriesLengthMock$.next(categoriesLengthMock);
      await currentDiceAmount$.next(currentDiceAmountMock);
      await currentCategoriesMock$.next(currentCategoriesMock);

      expect(diceAreaViewComponentMock.tellAStory).toHaveBeenCalledTimes(1);
      expect(diceAreaViewComponentMock.tellAStory).toHaveBeenCalledWith(
        currentCategoriesMock,
        currentDiceAmountMock,
      );
    });

    test('Should tell a story (diceAmount === categoriesLength)', async () => {
      const currentDiceAmountMock = categoriesLengthMock;

      await currentCategoriesLengthMock$.next(categoriesLengthMock);
      await currentDiceAmount$.next(currentDiceAmountMock);
      await currentCategoriesMock$.next(currentCategoriesMock);

      expect(diceAreaViewComponentMock.tellAStory).toHaveBeenCalledTimes(1);
      expect(diceAreaViewComponentMock.tellAStory).toHaveBeenCalledWith(
        currentCategoriesMock,
        currentDiceAmountMock,
      );
    });

    test('Should tell a story (diceAmount > categoriesLength)', async () => {
      const currentDiceAmountMock = categoriesLengthMock + 2;

      await currentCategoriesLengthMock$.next(categoriesLengthMock);
      await currentDiceAmount$.next(currentDiceAmountMock);
      await currentCategoriesMock$.next(currentCategoriesMock);

      expect(diceAreaViewComponentMock.tellAStory).not.toHaveBeenCalledTimes(1);
    });
  });

  test('Should tell a stroy once again (tellAStoryOnceAgain())', async () => {
    const currentDiceAmountMock = 6;
    currentCategoriesMock$.next(currentCategoriesMock);
    currentDiceAmount$.next(currentDiceAmountMock);

    await viewModel.tellAStoryOnceAgain();

    expect(diceAreaViewComponentMock.tellAStory).toBeCalledTimes(1);
    expect(diceAreaViewComponentMock.tellAStory).toHaveBeenCalledWith(
      currentCategoriesMock,
      currentDiceAmountMock,
    );
  });

  test('Should update max dice amount, when categories length is updated (_updateMaxDiceAmountSubscribe())', () => {
    const rawCategoriesLengthMock = 6;

    testScheduler.run(({ expectObservable, cold }) => {
      expectObservable(storyCategoriesViewComponentMock.currentCategoriesLength$).toBe('a', {
        a: rawCategoriesLengthMock,
      });

      cold('a').subscribe(() => {
        currentCategoriesLengthMock$.next(rawCategoriesLengthMock);

        expect(diceAmountViewComponentMock.changeMaxDiceAmount).toHaveBeenCalledTimes(1);
        expect(diceAmountViewComponentMock.changeMaxDiceAmount).toHaveBeenCalledWith(
          rawCategoriesLengthMock,
        );
      });
    });
  });
});
