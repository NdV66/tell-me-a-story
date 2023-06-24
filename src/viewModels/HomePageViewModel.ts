import { combineLatest, filter } from 'rxjs';
import { IDiceAreaViewComponent } from './DiceAreaViewComponent';
import { IDiceAmountViewComponent } from './DiceAmountViewComponent';
import { IDiceCategoriesViewComponent } from './DiceCategoriesViewComponent';
import { IIconsManager } from 'models';

export interface IHomePageViewModel {}

export class HomePageViewModel implements IHomePageViewModel {
  constructor(
    private _diceAreaViewComponent: IDiceAreaViewComponent,
    private _diceAmountViewComponent: IDiceAmountViewComponent,
    private _diceCategoriesViewComponent: IDiceCategoriesViewComponent,
    private _iconsManager: IIconsManager,
  ) {
    this._diceCategoriesViewComponent.currentCategories$.subscribe((categories) => {
      this._diceAmountViewComponent.changeMaxDiceAmount(categories);
    });

    combineLatest([
      this._diceCategoriesViewComponent.currentCategories$,
      this._diceAmountViewComponent.currentDiceAmount$,
      this._diceAmountViewComponent.maxDiceAmount$,
    ])
      .pipe(
        filter(([categories, diceAmount, max]) => {
          console.log('>>> skip skip', categories, diceAmount, max, diceAmount > max);
          const x = this._iconsManager.getCategoriesAmount(categories);
          return diceAmount <= x;
        }),
      )
      .subscribe(async ([categories, diceAmount]) => {
        this._diceAreaViewComponent.tellAStory(categories, diceAmount);
      });
  }
}
