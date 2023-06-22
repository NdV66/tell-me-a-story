import { IStoryTellerModel } from 'models';
import { Observable, Subject } from 'rxjs';
import { EStoryCategory } from 'types';

export interface IHomePageViewModel {
  currentDice$: Observable<string[] | undefined>;
  tellAStory: (category: EStoryCategory, amount: number) => void;
}

export class HomePageViewModel implements IHomePageViewModel {
  private _currentDice$: Subject<string[]> = new Subject();

  constructor(private _storyTeller: IStoryTellerModel) {}

  get currentDice$() {
    return this._currentDice$.asObservable();
  }

  public tellAStory = (category: EStoryCategory, amount: number) => {
    const dice = this._storyTeller.tellAStory(category, amount);
    this._currentDice$.next(dice);
  };
}
