import { BehaviorSubject, Observable, combineLatest, firstValueFrom } from 'rxjs';
import { EStoryCategory, TDiceSettings } from 'types';
import { IDiceAreaViewComponent } from './DiceAreaViewComponent';
import { IDiceAmountViewComponent } from './DiceAmountViewComponent';

export interface IHomePageViewModel {
  currentCategories$: Observable<EStoryCategory[] | undefined>;
  diceSettings: TDiceSettings;

  changeCategories: (categories: EStoryCategory[]) => void;
}

export class HomePageViewModel implements IHomePageViewModel {
  private _currentCategories$: BehaviorSubject<EStoryCategory[]>;

  constructor(
    private _diceAreaViewComponent: IDiceAreaViewComponent,
    private _diceAmountViewComponent: IDiceAmountViewComponent,
    public readonly diceSettings: TDiceSettings,
  ) {
    this._currentCategories$ = new BehaviorSubject(this.diceSettings.defaultCategoriesKeys);

    this._subscribeToCategories();
    this._subscribeToDiceSettings();
  }

  private _subscribeToCategories() {
    this.currentCategories$.subscribe((categories) =>
      this._diceAmountViewComponent.changeMaxDiceAmount(categories),
    );
  }

  private _subscribeToDiceSettings() {
    combineLatest([
      this._diceAmountViewComponent.currentDiceAmount$,
      this._currentCategories$,
    ]).subscribe(([diceAmount, categories]) => {
      this._diceAreaViewComponent.tellAStory(categories, diceAmount);
    });
  }

  get currentCategories$() {
    return this._currentCategories$.asObservable();
  }

  public changeCategories = async (categories: EStoryCategory[]) => {
    const areTheSame = await this.areCategoriesTheSame(categories);
    !areTheSame && categories.length && this._currentCategories$.next(categories);
  };

  private async areCategoriesTheSame(selectedValues: EStoryCategory[]) {
    const currentCategories = await firstValueFrom(this.currentCategories$);

    if (currentCategories.length !== selectedValues.length) return false;
    return currentCategories.every((el) => selectedValues.includes(el));
  }
}
