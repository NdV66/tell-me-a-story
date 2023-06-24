import { combineLatest } from 'rxjs';
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
    ]).subscribe(async ([categories, diceAmount]) => {
      //   console.log('>>>', categories, diceAmount, max);
      try {
        this._diceAreaViewComponent.tellAStory(categories, diceAmount);
      } catch (e) {
        console.log('I dont know how to fix it'); //TODO maybe somehow better? how?
      }
    });
  }
}
