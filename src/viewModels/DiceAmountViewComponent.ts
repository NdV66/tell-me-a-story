import { IIconsManager } from 'models';
import { BehaviorSubject, Observable, Subject, firstValueFrom } from 'rxjs';
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
    const max = this._prepareMaxAmount(this.diceSettings.defaultCategoriesKeys);
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

  public async changeMaxDiceAmount(categories: EStoryCategory[]) {
    const max = this._prepareMaxAmount(categories);
    const current = await firstValueFrom(this._currentDiceAmount$);

    if (current > max) this._currentDiceAmount$.next(max);
    this._maxDiceAmount$.next(max);
  }

  private _prepareMaxAmount(categories: EStoryCategory[]) {
    const { stepDice } = this.diceSettings;
    const iconsAmount = this._iconManager.getCategoriesAmount(categories);
    const amount = iconsAmount - (iconsAmount % stepDice);
    const realMax = stepDice * this.diceSettings.maxThresholds;

    return amount > realMax ? realMax : amount;
  }
}
