import { ReplaySubject, Subject } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { getTestScheduler } from 'tests/helpers';
import {
  diceAmountViewComponentMock,
  diceAreaViewComponentMock,
  storyCategoriesViewComponentMock,
} from 'tests/mocks';
import { EStoryCategory } from 'types';
import { HomePageViewModel } from 'viewModels';

describe('HomePageViewModel', () => {
  let viewModel: HomePageViewModel;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = getTestScheduler();
  });

  describe('_tellAStorySubscribe()', () => {
    const currentCategoriesMock = [EStoryCategory.BOTTLES, EStoryCategory.CREATURES];
    let currentCategoriesLengthMock$: ReplaySubject<number>;
    let currentDiceAmount$: ReplaySubject<number>;
    let currentCategoriesMock$: ReplaySubject<EStoryCategory[]>;

    beforeEach(() => {
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

    test('Should tell a story (diceAmount < categoriesLength)', async () => {
      const categoriesLengthMock = 8;
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
      const categoriesLengthMock = 8;
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
      const categoriesLengthMock = 8;
      const currentDiceAmountMock = categoriesLengthMock + 2;

      await currentCategoriesLengthMock$.next(categoriesLengthMock);
      await currentDiceAmount$.next(currentDiceAmountMock);
      await currentCategoriesMock$.next(currentCategoriesMock);

      expect(diceAreaViewComponentMock.tellAStory).not.toHaveBeenCalledTimes(1);
    });
  });

  test('Should tell a stroy once again (tellAStoryOnceAgain())', async () => {
    const currentCategoriesMock$ = new ReplaySubject<EStoryCategory[]>();
    const currentDiceAmount$ = new ReplaySubject<number>();
    const categoriesMock = [EStoryCategory.CREATURES, EStoryCategory.DANGERS];
    const currentDiceAmountMock = 6;

    storyCategoriesViewComponentMock.currentCategories$ = currentCategoriesMock$;
    diceAmountViewComponentMock.currentDiceAmount$ = currentDiceAmount$;
    viewModel = new HomePageViewModel(
      diceAreaViewComponentMock,
      diceAmountViewComponentMock,
      storyCategoriesViewComponentMock,
    );

    currentCategoriesMock$.next(categoriesMock);
    currentDiceAmount$.next(currentDiceAmountMock);
    await viewModel.tellAStoryOnceAgain();

    expect(diceAreaViewComponentMock.tellAStory).toBeCalledTimes(1);
    expect(diceAreaViewComponentMock.tellAStory).toHaveBeenCalledWith(
      categoriesMock,
      currentDiceAmountMock,
    );
  });

  test('Should update max dice amount, when categories length is updated (_updateMaxDiceAmountSubscribe())', () => {
    const rawCategoriesLengthMock = 6;
    const currentCategoriesLengthMock$ = new Subject<number>();
    storyCategoriesViewComponentMock.currentCategoriesLength$ = currentCategoriesLengthMock$;
    viewModel = new HomePageViewModel(
      diceAreaViewComponentMock,
      diceAmountViewComponentMock,
      storyCategoriesViewComponentMock,
    );

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
