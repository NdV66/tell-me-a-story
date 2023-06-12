import { IIconsManager } from '.';

interface IStoryTellerModel {
  tellAStory: (iconsAmount: number) => Array<string>;
}

//TODO: tests
export class StoryTellerModel implements IStoryTellerModel {
  constructor(private _iconsManager: IIconsManager) {}

  public tellAStory(iconsAmount: number) {
    return this._iconsManager.playersIcons;
  }
}
