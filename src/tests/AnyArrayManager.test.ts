import { AnyArrayManager } from 'models';

describe('AnyArrayManager', () => {
  let manager: AnyArrayManager;

  beforeEach(() => {
    manager = new AnyArrayManager();
  });

  test('Should shuffle array (2 elements)', () => {
    const array = [1, 2];
    const expectedArray = [2, 1];
    manager['_randomInteger'] = jest.fn().mockReturnValue(1).mockReturnValue(0);
    manager = new AnyArrayManager();

    const result = manager.shuffle(array);
    expect(result).toEqual(expectedArray);
  });

  test('Should shuffle array (1 element)', () => {
    const array = [2];
    const expectedArray = [2];
    manager['_randomInteger'] = jest.fn().mockReturnValue(0);
    manager = new AnyArrayManager();

    const result = manager.shuffle(array);
    expect(result).toEqual(expectedArray);
  });

  test.only('Should shuffle array (5 elements)', () => {
    const array = [1, 2, 3, 4, 5];
    const expectedArray = [3, 5, 2, 4, 1];
    manager['_randomInteger'] = jest
      .fn()
      .mockReturnValue(0)
      .mockReturnValue(1)
      .mockReturnValue(4)
      .mockReturnValue(0)
      .mockReturnValue(2);
    manager = new AnyArrayManager();

    const result = manager.shuffle(array);
    console.log(result);
    expect(result).toEqual(expectedArray);
  });
});
