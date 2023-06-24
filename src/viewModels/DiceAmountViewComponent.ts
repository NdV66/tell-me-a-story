import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { TDiceSettings } from 'types';

export interface IDiceAmountViewComponent {
  currentDiceAmount$: Observable<number>;
  maxDiceAmount$: Observable<number>;
  diceSettings: TDiceSettings;

  changeDiceAmount: (amount: number) => void;
  changeMaxDiceAmount: (rawCategoriesLength: number) => void;
}

export class DiceAmountViewComponent implements IDiceAmountViewComponent {
  private _currentDiceAmount$: BehaviorSubject<number>;
  private _maxDiceAmount$: BehaviorSubject<number>;

  constructor(public readonly diceSettings: TDiceSettings) {
    const max = this._prepareMaxAmount(this.diceSettings.defaultCategoriesLength);
    const current = max - this.diceSettings.stepDice;

    this._currentDiceAmount$ = new BehaviorSubject(current);
    this._maxDiceAmount$ = new BehaviorSubject(max);
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

  public async changeMaxDiceAmount(rawCategoriesLength: number) {
    const max = this._prepareMaxAmount(rawCategoriesLength);
    const current = await firstValueFrom(this._currentDiceAmount$);

    if (current > max) this._currentDiceAmount$.next(max);
    this._maxDiceAmount$.next(max);
  }

  private _prepareMaxAmount(rawCategoriesLength: number) {
    const { stepDice } = this.diceSettings;
    const amount = rawCategoriesLength - (rawCategoriesLength % stepDice);
    const realMax = stepDice * this.diceSettings.maxThresholds;

    return amount > realMax ? realMax : amount;
  }
}
