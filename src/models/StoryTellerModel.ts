import { EStoryCategory, TAppErrors } from 'types';
import { IAnyArrayManager, IIconsManager } from '.';

export interface IStoryTellerModel {
  tellAStory: (categories: EStoryCategory[], iconsAmount: number) => Array<string>;
}

export class StoryTellerModel implements IStoryTellerModel {
  static MIN_INDEX = 0;
  static MIN_AMOUNT = 1;

  constructor(
    private _iconsManager: IIconsManager,
    private _errors: TAppErrors,
    private _arrayManager: IAnyArrayManager,
  ) {}

  private getIconsPerCategories(categories: EStoryCategory[]) {
    const icons = categories.map((category) => this._iconsManager.getIconsSetPerCategory(category));
    const allIcons = icons.reduce((prev, curr) => [...prev, ...curr], []);
    return this._arrayManager.shuffle(allIcons);
  }

  public tellAStory(categories: EStoryCategory[], iconsAmount: number) {
    const icons = this.getIconsPerCategories(categories);
    const allIconsAmount = icons.length;

    if (iconsAmount > allIconsAmount || iconsAmount < StoryTellerModel.MIN_AMOUNT)
      throw this._errors.OUT_OF_RANGE;

    return icons.slice(StoryTellerModel.MIN_INDEX, iconsAmount);
  }
}
