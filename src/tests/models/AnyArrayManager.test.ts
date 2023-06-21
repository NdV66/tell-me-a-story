import { AnyArrayManager } from 'models';

describe('AnyArrayManager', () => {
  let manager: AnyArrayManager;

  beforeEach(() => {
    manager = new AnyArrayManager();
  });

  test('Should shuffle array (2 elements)', () => {
    const array = [1, 2];
    const expectedArray = [2, 1];
    manager['_randomInteger'] = jest.fn().mockReturnValue(0).mockReturnValue(1);
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

  test('Should shuffle array (3 elements)', () => {
    const array = ['a', 'b', 'c'];
    const expectedArray = ['b', 'a', 'c'];
    manager['_randomInteger'] = jest
      .fn()
      .mockReturnValueOnce(1)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(2);

    const result = manager.shuffle(array);
    expect(result).toEqual(expectedArray);
  });

  test('Should shuffle array (5 elements)', () => {
    const array = [1, 2, 3, 4, 5];
    const expectedArray = [1, 5, 4, 2, 3];
    manager['_randomInteger'] = jest
      .fn()
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(1)
      .mockReturnValueOnce(4)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(2);

    const result = manager.shuffle(array);
    expect(result).toEqual(expectedArray);
  });
});
