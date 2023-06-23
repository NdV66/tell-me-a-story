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
    this._subscribeToCategories();
    this._subscribeToDiceSettings();
  }

  private _subscribeToCategories() {
    this._diceCategoriesViewComponent.currentCategories$.subscribe((categories) =>
      this._diceAmountViewComponent.changeMaxDiceAmount(categories),
    );
  }

  private _subscribeToDiceSettings() {
    combineLatest([
      this._diceCategoriesViewComponent.currentCategories$,
      this._diceAmountViewComponent.currentDiceAmount$,
    ]).subscribe(([categories, diceAmount]) => {
      this._diceAreaViewComponent.tellAStory(categories, diceAmount);
    });
  }
}
