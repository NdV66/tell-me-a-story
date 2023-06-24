import { combineLatest, filter } from 'rxjs';
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
      this._diceCategoriesViewComponent.currentCategories$,
      this._diceAmountViewComponent.currentDiceAmount$,
      this._diceCategoriesViewComponent.currentCategoriesLength$,
    ])
      .pipe(
        filter(([_, diceAmount, categoriesLength]) => {
          return diceAmount <= categoriesLength;
        }),
      )
      .subscribe(async ([categories, diceAmount]) => {
        this._diceAreaViewComponent.tellAStory(categories, diceAmount);
      });
  }
}
