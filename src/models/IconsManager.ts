import { EStoryCategory, TIconsSet } from 'types';
import { IAnyArrayManager } from './AnyArrayManager';

export interface IIconsManager {
  iconPrefix: string;
  getIconsSetPerCategory: (category: EStoryCategory) => string[];
  getCategoriesAmount: (categories: EStoryCategory[]) => number;
}

export class IconsManager implements IIconsManager {
  constructor(
    private _iconPrefix: string,
    private _arrayManager: IAnyArrayManager,
    private _iconsSet: TIconsSet,
  ) {}

  get iconPrefix() {
    return this._iconPrefix;
  }

  public getCategoriesAmount(categories: EStoryCategory[]) {
    const start = 0;
    return categories.reduce((prev, curr) => prev + this._iconsSet[curr]!!.length, start);
  }

  public getIconsSetPerCategory(category: EStoryCategory) {
    const icons = this._iconsSet[category]!!;
    return this._arrayManager.shuffle(icons);
  }
}
