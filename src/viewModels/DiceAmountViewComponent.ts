import { IIconsManager } from 'models';
import { BehaviorSubject, Observable } from 'rxjs';
import { EStoryCategory, TDiceSettings } from 'types';

export interface IDiceAmountViewComponent {
  currentDiceAmount$: Observable<number>;
  maxDiceAmount$: Observable<number>;
  diceSettings: TDiceSettings;

  changeDiceAmount: (amount: number) => void;
  changeMaxDiceAmount: (categories: EStoryCategory[]) => void;
}

export class DiceAmountViewComponent implements IDiceAmountViewComponent {
  private _currentDiceAmount$: BehaviorSubject<number>;
  private _maxDiceAmount$: BehaviorSubject<number>;

  constructor(private _iconManager: IIconsManager, public readonly diceSettings: TDiceSettings) {
    this._currentDiceAmount$ = new BehaviorSubject(this.diceSettings.defaultDiceAmount);
    this._maxDiceAmount$ = new BehaviorSubject(
      this._prepareMaxAmount(this.diceSettings.defaultCategoriesKeys),
    );
  }

  get maxDiceAmount$() {
    return this._maxDiceAmount$.asObservable();
  }

  get currentDiceAmount$() {
    return this._currentDiceAmount$.asObservable();
  }

  public changeDiceAmount = (amount: number) => {
    this._currentDiceAmount$.next(amount);
  };

  public changeMaxDiceAmount(categories: EStoryCategory[]) {
    const newValue = this._prepareMaxAmount(categories);
    this._maxDiceAmount$.next(newValue);
  }

  private _prepareMaxAmount(categories: EStoryCategory[]) {
    const { stepDice } = this.diceSettings;
    const iconsAmount = this._iconManager.getCategoriesAmount(categories);
    const amount = iconsAmount - (iconsAmount % stepDice);
    const realMax = stepDice * this.diceSettings.maxThresholds;

    return amount > realMax ? realMax : amount;
  }
}
