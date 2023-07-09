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
