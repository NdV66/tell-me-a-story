import { combineLatest, filter, firstValueFrom, map } from 'rxjs';
import { IDiceAreaViewComponent } from './DiceAreaViewComponent';
import { IDiceAmountViewComponent } from './DiceAmountViewComponent';
import { IDiceCategoriesViewComponent } from './DiceCategoriesViewComponent';

export interface IHomePageViewModel {}

export class HomePageViewModel implements IHomePageViewModel {
  constructor(
    private _diceAreaViewComponent: IDiceAreaViewComponent,
    private _diceAmountViewComponent: IDiceAmountViewComponent,
    private _diceCategoriesViewComponent: IDiceCategoriesViewComponent,
  ) {
    this._diceCategoriesViewComponent.currentCategoriesLength$.subscribe((rawCategoriesLength) => {
      this._diceAmountViewComponent.changeMaxDiceAmount(rawCategoriesLength);
    });

    combineLatest([
      this._diceAmountViewComponent.currentDiceAmount$,
      this._diceCategoriesViewComponent.currentCategoriesLength$,
    ])
      .pipe(
        filter(([diceAmount, categoriesLength]) => diceAmount <= categoriesLength),
        map(([diceAmount]) => diceAmount),
      )
      .subscribe(async (diceAmount) => {
        const categories = await firstValueFrom(
          this._diceCategoriesViewComponent.currentCategories$,
        );
        this._diceAreaViewComponent.tellAStory(categories, diceAmount);
      });
  }
}
