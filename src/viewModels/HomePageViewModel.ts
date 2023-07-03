import { combineLatest, filter, firstValueFrom, map } from 'rxjs';
import { IDiceAreaViewComponent } from './DiceAreaViewComponent';
import { IDiceAmountViewComponent } from './DiceAmountViewComponent';
import { IStoryCategoriesViewComponent } from './StoryCategoriesViewComponent';

export interface IHomePageViewModel {
  tellAStoryOnceAgain: () => void;
}

//TODO tests
export class HomePageViewModel implements IHomePageViewModel {
  constructor(
    private _diceAreaViewComponent: IDiceAreaViewComponent,
    private _diceAmountViewComponent: IDiceAmountViewComponent,
    private _storyCategoriesViewComponent: IStoryCategoriesViewComponent,
  ) {
    this._updateMaxDiceAmountSubscribe();
    this._tellAStorySubscribe();
  }

  private _updateMaxDiceAmountSubscribe() {
    this._storyCategoriesViewComponent.currentCategoriesLength$.subscribe((rawCategoriesLength) => {
      this._diceAmountViewComponent.changeMaxDiceAmount(rawCategoriesLength);
    });
  }

  private _tellAStorySubscribe() {
    combineLatest([
      this._diceAmountViewComponent.currentDiceAmount$,
      this._storyCategoriesViewComponent.currentCategoriesLength$,
    ])
      .pipe(
        filter(([diceAmount, categoriesLength]) => diceAmount <= categoriesLength),
        map(([diceAmount]) => diceAmount),
      )
      .subscribe(async (diceAmount) => {
        const categories = await firstValueFrom(
          this._storyCategoriesViewComponent.currentCategories$,
        );
        this._diceAreaViewComponent.tellAStory(categories, diceAmount);
      });
  }

  public tellAStoryOnceAgain = async () => {
    const categories = await firstValueFrom(this._storyCategoriesViewComponent.currentCategories$);
    const diceAmount = await firstValueFrom(this._diceAmountViewComponent.currentDiceAmount$);

    this._diceAreaViewComponent.tellAStory(categories, diceAmount);
  };
}
