import { IStoryTellerModel } from 'models';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { EStoryCategory } from 'types';

export interface IHomePageViewModel {
  currentDice$: Observable<string[] | undefined>;
  currentDiceAmount$: Observable<number | undefined>;

  tellAStory: (category: EStoryCategory, amount: number) => void;
  changeDiceAmount: (amount: number) => void;
}

export class HomePageViewModel implements IHomePageViewModel {
  private _currentDice$: Subject<string[]> = new Subject();
  private _currentDiceAmount$: BehaviorSubject<number>;

  constructor(private _storyTeller: IStoryTellerModel, defaultDiceAmount: number) {
    this._currentDiceAmount$ = new BehaviorSubject(defaultDiceAmount);
  }

  get currentDice$() {
    return this._currentDice$.asObservable();
  }

  get currentDiceAmount$() {
    return this._currentDiceAmount$.asObservable();
  }

  public changeDiceAmount = (amount: number) => {
    this._currentDiceAmount$.next(amount);
  };

  public tellAStory = (category: EStoryCategory, amount: number) => {
    const dice = this._storyTeller.tellAStory(category, amount);
    this._currentDice$.next(dice);
  };
}
