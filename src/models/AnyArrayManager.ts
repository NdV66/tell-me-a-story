export interface IAnyArrayManager {
  shuffle: <T>(array: Array<T>) => Array<T>;
}

export class AnyArrayManager implements IAnyArrayManager {
  private _randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public shuffle<T>(array: Array<T>) {
    const min = 0;
    const max = array.length - 1;

    for (let i = max; i >= 0; i--) {
      const randomIndex = this._randomInteger(min, max);
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }

    return array;
  }
}
