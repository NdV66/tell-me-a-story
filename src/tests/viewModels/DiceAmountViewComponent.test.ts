import { TestScheduler } from 'rxjs/testing';

import { diceSettingsMock } from 'tests/mocks';
import { DiceAmountViewComponent } from 'viewModels';

const expectedIconsMaxLength_onEnter = diceSettingsMock.defaultCategoriesLength;
const expectedIconsCurrentLength_onEnter =
  expectedIconsMaxLength_onEnter - diceSettingsMock.stepDice;

const prepareMaxAmountMock = jest.fn().mockReturnValue(expectedIconsMaxLength_onEnter);
const prepareEnterCurrentAmountMock = jest.fn().mockReturnValue(expectedIconsCurrentLength_onEnter);

// cold('a').subscribe(() => viewModel.changeDiceAmount(expectedAmount));

describe('DiceAmountViewComponent', () => {
  let viewModel: DiceAmountViewComponent;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      //   console.log(actual, expected);
      expect(actual).toEqual(expected);
    });
    viewModel = new DiceAmountViewComponent(diceSettingsMock);
  });

  test('Should setup values on enter', () => {
    viewModel['_prepareMaxAmount'] = prepareMaxAmountMock;
    viewModel['_prepareEnterCurrentAmount'] = prepareEnterCurrentAmountMock;

    testScheduler.run(({ expectObservable }) => {
      const expectedMaxMarble = 'a';
      const expectedMax$ = { a: expectedIconsMaxLength_onEnter };

      const expectedCurrentMarble = 'a';
      const expectedCurrent$ = { a: expectedIconsCurrentLength_onEnter };

      expectObservable(viewModel.maxDiceAmount$).toBe(expectedMaxMarble, expectedMax$);
      expectObservable(viewModel.currentDiceAmount$).toBe(expectedCurrentMarble, expectedCurrent$);
    });
  });

  test('_prepareEnterCurrentAmount()', () => {
    const max = diceSettingsMock.stepDice + 2;
    const expectedResult = max - diceSettingsMock.stepDice;
    const result = viewModel['_prepareEnterCurrentAmount'](max);

    expect(result).toBe(expectedResult);
  });

  test('Should change current dice amount', () => {
    viewModel['_prepareMaxAmount'] = prepareMaxAmountMock;
    viewModel['_prepareEnterCurrentAmount'] = prepareEnterCurrentAmountMock;
    const expectedAmount = 4;

    testScheduler.run(({ expectObservable }) => {
      const expectedMaxMarble = 'a';
      const expected$ = { a: expectedAmount };

      viewModel.changeDiceAmount(expectedAmount);
      expectObservable(viewModel.currentDiceAmount$).toBe(expectedMaxMarble, expected$);
    });
  });

  describe('_prepareMaxAmount()', () => {
    const defaultMax = diceSettingsMock.maxThresholds * diceSettingsMock.stepDice;

    test('Should return default max amount, when the real amount is bigger than the default (real) max', () => {
      const rawCategoriesLengthMock = defaultMax + 8;
      const result = viewModel['_prepareMaxAmount'](rawCategoriesLengthMock);

      expect(result).toBe(defaultMax);
    });

    test('Should return calculated max amount, when the real amount is less than the default (real) max', () => {
      const rawCategoriesLengthMock = defaultMax - 1;
      const expectedAmount =
        rawCategoriesLengthMock - (rawCategoriesLengthMock % diceSettingsMock.stepDice);
      const result = viewModel['_prepareMaxAmount'](rawCategoriesLengthMock);

      expect(result).toBe(expectedAmount);
    });

    test('Should return calculated max amount, when the real amount is equal to the default (real) max', () => {
      const rawCategoriesLengthMock = defaultMax;
      const expectedAmount =
        rawCategoriesLengthMock - (rawCategoriesLengthMock % diceSettingsMock.stepDice);
      const result = viewModel['_prepareMaxAmount'](rawCategoriesLengthMock);

      expect(result).toBe(expectedAmount);
    });
  });
});
