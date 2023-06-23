import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { EStoryCategory, TDiceSettings } from 'types';

export interface IDiceCategoriesViewComponent {
  currentCategories$: Observable<EStoryCategory[]>;
  diceSettings: TDiceSettings;
  changeCategories: (categories: EStoryCategory[]) => void;
}

export class DiceCategoriesViewComponent implements IDiceCategoriesViewComponent {
  private _currentCategories$: BehaviorSubject<EStoryCategory[]>;

  constructor(public readonly diceSettings: TDiceSettings) {
    this._currentCategories$ = new BehaviorSubject(this.diceSettings.defaultCategoriesKeys);
  }

  get currentCategories$() {
    return this._currentCategories$.asObservable();
  }

  public changeCategories = async (categories: EStoryCategory[]) => {
    const areTheSame = await this._areCategoriesTheSame(categories);
    !areTheSame && categories.length && this._currentCategories$.next(categories);
  };

  private async _areCategoriesTheSame(selectedValues: EStoryCategory[]) {
    const currentCategories = await firstValueFrom(this.currentCategories$);

    if (currentCategories.length !== selectedValues.length) return false;
    return currentCategories.every((el) => selectedValues.includes(el));
  }
}
