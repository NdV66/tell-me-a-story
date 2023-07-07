import { IIconsManager } from 'models';
import { BehaviorSubject, Observable, ReplaySubject, firstValueFrom } from 'rxjs';
import { EStoryCategory, TDiceSettings } from 'types';

export interface IStoryCategoriesViewComponent {
  currentCategories$: Observable<EStoryCategory[]>;
  currentCategoriesLength$: Observable<number>;

  diceSettings: TDiceSettings;
  changeCategories: (categories: EStoryCategory[]) => void;
}

//TODO tests
export class StoryCategoriesViewComponent implements IStoryCategoriesViewComponent {
  private _currentCategories$: BehaviorSubject<EStoryCategory[]>;
  private _currentCategoriesLength$: ReplaySubject<number>;

  constructor(private _iconsManager: IIconsManager, public readonly diceSettings: TDiceSettings) {
    this._currentCategoriesLength$ = new ReplaySubject(1);
    this._currentCategories$ = new BehaviorSubject(this.diceSettings.defaultCategoriesKeys);

    this._changeCurrentCategoriesLengthSubscribe();
  }

  private _changeCurrentCategoriesLengthSubscribe() {
    this.currentCategories$.subscribe((categories) => {
      const categoriesLength = this._iconsManager.getCategoriesAmount(categories);
      this._currentCategoriesLength$.next(categoriesLength);
    });
  }

  get currentCategories$() {
    return this._currentCategories$.asObservable();
  }

  get currentCategoriesLength$() {
    return this._currentCategoriesLength$.asObservable();
  }

  public changeCategories = async (categories: EStoryCategory[]) => {
    const areTheSame = await this._areCategoriesTheSame(categories);
    categories.length && !areTheSame && this._currentCategories$.next(categories);
  };

  private async _areCategoriesTheSame(selectedValues: EStoryCategory[]) {
    //TODO tests
    const currentCategories = await firstValueFrom(this.currentCategories$);

    if (currentCategories.length !== selectedValues.length) return false;
    return currentCategories.every((el) => selectedValues.includes(el));
  }
}
