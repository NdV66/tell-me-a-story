import { IStoryTellerModel } from 'models';
import { BehaviorSubject, Observable, Subject, combineLatest } from 'rxjs';
import { EStoryCategory, TDiceSettings } from 'types';

export interface IHomePageViewModel {
  currentDice$: Observable<string[] | undefined>;
  currentDiceAmount$: Observable<number | undefined>;
  currentCategories$: Observable<string[] | undefined>;

  diceSettings: TDiceSettings;

  tellAStory: (category: EStoryCategory, amount: number) => void;
  changeDiceAmount: (amount: number) => void;
  changeCategories: (categories: string[]) => void;
}

export class HomePageViewModel implements IHomePageViewModel {
  private _currentDice$: Subject<string[]> = new Subject();
  private _currentDiceAmount$: BehaviorSubject<number>;
  private _currentCategories$: BehaviorSubject<string[]>;

  constructor(
    private _storyTeller: IStoryTellerModel,
    public readonly diceSettings: TDiceSettings,
  ) {
    this._currentDiceAmount$ = new BehaviorSubject(this.diceSettings.defaultDiceAmount);
    this._currentCategories$ = new BehaviorSubject(this.diceSettings.defaultCategoriesKeys);

    combineLatest([this._currentDiceAmount$]).subscribe(([diceAmount]) => {
      this.tellAStory(EStoryCategory.PLAYER, diceAmount);
    });
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

  public changeCategories = (categories: string[]) => {
    this._currentCategories$.next(categories);
  };

  public tellAStory = (category: EStoryCategory, amount: number) => {
    console.log(category, amount);
    const dice = this._storyTeller.tellAStory(category, amount);
    this._currentDice$.next(dice);
  };
}
