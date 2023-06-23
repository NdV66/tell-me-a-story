import { IIconsManager, IStoryTellerModel } from 'models';
import { BehaviorSubject, Observable, Subject, combineLatest, firstValueFrom } from 'rxjs';
import { EStoryCategory, TDiceSettings } from 'types';

export interface IHomePageViewModel {
  currentDice$: Observable<string[] | undefined>;
  currentDiceAmount$: Observable<number | undefined>;
  currentCategories$: Observable<EStoryCategory[] | undefined>;
  maxDiceAmount$: Observable<number>;

  diceSettings: TDiceSettings;

  tellAStory: (categories: EStoryCategory[], amount: number) => void;
  changeDiceAmount: (amount: number) => void;
  changeCategories: (categories: EStoryCategory[]) => void;
}

export class HomePageViewModel implements IHomePageViewModel {
  private _currentDice$: Subject<string[]> = new Subject();
  private _currentDiceAmount$: BehaviorSubject<number>;
  private _currentCategories$: BehaviorSubject<EStoryCategory[]>;
  private _maxDiceAmount$: BehaviorSubject<number>;

  constructor(
    private _storyTeller: IStoryTellerModel,
    private _iconManager: IIconsManager,
    public readonly diceSettings: TDiceSettings,
  ) {
    this._currentDiceAmount$ = new BehaviorSubject(this.diceSettings.defaultDiceAmount);
    this._currentCategories$ = new BehaviorSubject(this.diceSettings.defaultCategoriesKeys);
    this._maxDiceAmount$ = new BehaviorSubject(
      this._prepareMaxAmount(this.diceSettings.defaultCategoriesKeys),
    );

    this._subscribeToCategories();
    this._subscribeToDiceSettings();
  }

  private _subscribeToCategories() {
    this.currentCategories$.subscribe((el) =>
      this._maxDiceAmount$.next(this._prepareMaxAmount(el)),
    );
  }

  private _subscribeToDiceSettings() {
    combineLatest([this._currentDiceAmount$, this._currentCategories$]).subscribe(
      ([diceAmount, categories]) => {
        this.tellAStory(categories, diceAmount);
      },
    );
  }

  get maxDiceAmount$() {
    return this._maxDiceAmount$.asObservable();
  }

  get currentDice$() {
    return this._currentDice$.asObservable();
  }

  get currentDiceAmount$() {
    return this._currentDiceAmount$.asObservable();
  }

  get currentCategories$() {
    return this._currentCategories$.asObservable();
  }

  public changeDiceAmount = (amount: number) => {
    this._currentDiceAmount$.next(amount);
  };

  public changeCategories = async (categories: EStoryCategory[]) => {
    const areTheSame = await this.areCategoriesTheSame(categories);
    !areTheSame && categories.length && this._currentCategories$.next(categories);
  };

  public tellAStory = (category: EStoryCategory[], amount: number) => {
    const dice = this._storyTeller.tellAStory(category, amount);
    this._currentDice$.next(dice);
  };

  private async areCategoriesTheSame(selectedValues: EStoryCategory[]) {
    const currentCategories = await firstValueFrom(this.currentCategories$);

    if (currentCategories.length !== selectedValues.length) return false;
    return currentCategories.every((el) => selectedValues.includes(el));
  }

  private _prepareMaxAmount(categories: EStoryCategory[]) {
    const { stepDice } = this.diceSettings;
    const iconsAmount = this._iconManager.getCategoriesAmount(categories);
    const amount = iconsAmount - (iconsAmount % stepDice);
    const realMax = stepDice * this.diceSettings.maxThresholds;

    return amount > realMax ? realMax : amount;
  }
}
