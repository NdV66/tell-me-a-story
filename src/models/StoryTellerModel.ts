import { EStoryCategory, TAppErrors } from 'types';
import { IIconsManager } from '.';

export interface IStoryTellerModel {
  tellAStory: (category: EStoryCategory, iconsAmount: number) => Array<string>;
}

export class StoryTellerModel implements IStoryTellerModel {
  static MIN_INDEX = 0;
  static MIN_AMOUNT = 1;

  constructor(private _iconsManager: IIconsManager, private _errors: TAppErrors) {}

  public tellAStory(category: EStoryCategory, iconsAmount: number) {
    const icons = this._iconsManager.getIconsSetPerCategory(category);
    const allIconsAmount = icons.length;

    if (iconsAmount >= allIconsAmount || iconsAmount < StoryTellerModel.MIN_AMOUNT)
      throw this._errors.OUT_OF_RANGE;

    return icons.slice(StoryTellerModel.MIN_INDEX, iconsAmount);
  }
}
