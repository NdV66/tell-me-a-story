export interface IIconsManager {
  playersIcons: Array<string>;
  iconPrefix: string;
}

//TODO: tests
export class IconsManager implements IIconsManager {
  constructor(private _iconPrefix: string, private _playersIcons: Array<string>) {}

  get playersIcons() {
    return this._playersIcons;
  }

  get iconPrefix() {
    return this._iconPrefix;
  }
}
