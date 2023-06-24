import { combineLatest, of, switchMap } from 'rxjs';
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
    this._diceCategoriesViewComponent.currentCategories$.subscribe((categories) => {
      this._diceAmountViewComponent.changeMaxDiceAmount(categories);
    });

    combineLatest([
      this._diceCategoriesViewComponent.currentCategories$,
      this._diceAmountViewComponent.currentDiceAmount$,
      this._diceAmountViewComponent.maxDiceAmount$,
    ]).subscribe(([categories, diceAmount, max]) => {
      //   console.log('>>>', categories, diceAmount, max);
      try {
        this._diceAreaViewComponent.tellAStory(categories, diceAmount);
      } catch (e) {
        console.log('NIE WIEM JAK TO POPRAWIC');
      }
    });
  }
}
