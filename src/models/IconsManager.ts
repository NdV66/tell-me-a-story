import { EStoryCategory, TIconsSet } from 'types';
import { IAnyArrayManager } from './AnyArrayManager';

export interface IIconsManager {
  iconPrefix: string;
  getIconsSetPerCategory: (category: EStoryCategory) => Array<string>;
}

export class IconsManager implements IIconsManager {
  private _iconsCategoryMap: Map<EStoryCategory, Array<string>>;

  constructor(
    private _iconPrefix: string,
    private _arrayManager: IAnyArrayManager,
    iconsSet: TIconsSet,
  ) {
    this._iconsCategoryMap = new Map([[EStoryCategory.PLAYER, iconsSet.player]]);
  }

  get iconPrefix() {
    return this._iconPrefix;
  }

  public getIconsSetPerCategory(category: EStoryCategory) {
    const icons = this._iconsCategoryMap.get(category)!!;
    return this._arrayManager.shuffle(icons);
  }
}
