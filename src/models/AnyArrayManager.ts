export interface IAnyArrayManager {
  shuffle: <T>(array: Array<T>) => Array<T>;
}

//TODO: tests
export class AnyArrayManager implements IAnyArrayManager {
  public shuffle<T>(array: Array<T>) {
    let currentIndex = array.length;
    let randomIndex = 0;

    while (currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }
}
