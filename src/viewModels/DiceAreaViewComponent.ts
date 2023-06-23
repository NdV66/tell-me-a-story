import { IStoryTellerModel } from 'models';
import { Observable, ReplaySubject } from 'rxjs';
import { EStoryCategory } from 'types';

export interface IDiceAreaViewComponent {
  currentDice$: Observable<string[] | undefined>;
  tellAStory: (categories: EStoryCategory[], amount: number) => void;
}

export class DiceAreaViewComponent implements IDiceAreaViewComponent {
  private _currentDice$: ReplaySubject<string[]> = new ReplaySubject();

  constructor(private _storyTeller: IStoryTellerModel) {}

  get currentDice$() {
    return this._currentDice$.asObservable();
  }

  public tellAStory = (category: EStoryCategory[], amount: number) => {
    const dice = this._storyTeller.tellAStory(category, amount);
    this._currentDice$.next(dice);
  };
}
