import { TestScheduler } from 'rxjs/testing';
import { getTestScheduler } from 'tests/helpers';

import { diceSettingsMock } from 'tests/mocks';
import { DiceAmountViewComponent } from 'viewModels';

const expectedIconsMaxLength_onEnter = diceSettingsMock.defaultCategoriesLength;
const expectedIconsCurrentLength_onEnter =
  expectedIconsMaxLength_onEnter - diceSettingsMock.stepDice;

const prepareMaxAmountMock = jest.fn().mockReturnValue(expectedIconsMaxLength_onEnter);
const prepareEnterCurrentAmountMock = jest.fn().mockReturnValue(expectedIconsCurrentLength_onEnter);

describe('DiceAmountViewComponent', () => {
  let viewModel: DiceAmountViewComponent;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = getTestScheduler();
    viewModel = new DiceAmountViewComponent(diceSettingsMock);
  });

  test('Should update _maxDiceAmount$/maxDiceAmount$', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const marble = 'a-b';
      const a = 1;
      const b = 2;
      const prepareFakeValues = jest.fn().mockReturnValueOnce(a).mockReturnValueOnce(b);

      cold(marble).subscribe(() => {
        viewModel['_maxDiceAmount$'].next(prepareFakeValues());
      });

      expectObservable(viewModel.maxDiceAmount$).toBe(marble, { a, b });
    });
  });

  test('Should update _currentDiceAmount$/currentDiceAmount$', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const marble = 'a-b';
      const a = 1;
      const b = 2;
      const prepareFakeValues = jest.fn().mockReturnValueOnce(a).mockReturnValueOnce(b);

      cold(marble).subscribe(() => {
        viewModel['_currentDiceAmount$'].next(prepareFakeValues());
      });

      expectObservable(viewModel.currentDiceAmount$).toBe(marble, { a, b });
    });
  });

  test('Should setup values on enter', () => {
    viewModel['_prepareMaxAmount'] = prepareMaxAmountMock;
    viewModel['_prepareEnterCurrentAmount'] = prepareEnterCurrentAmountMock;

    testScheduler.run(({ expectObservable }) => {
      expectObservable(viewModel.maxDiceAmount$).toBe('a', { a: expectedIconsMaxLength_onEnter });
      expectObservable(viewModel.currentDiceAmount$).toBe('a', {
        a: expectedIconsCurrentLength_onEnter,
      });
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

  describe('changeMaxDiceAmount()', () => {
    const rawCategoriesLength = 9;
    const maxMock = 9;

    test('Should update only _maxDiceAmount, when calculated new current  is less than max', async () => {
      const currentLengthOnEnter = 6;
      const prepareMaxAmountMock = jest.fn().mockReturnValue(maxMock);
      viewModel['_prepareMaxAmount'] = prepareMaxAmountMock;

      testScheduler.run(async ({ expectObservable }) => {
        viewModel['_currentDiceAmount$'].next(currentLengthOnEnter);

        await viewModel.changeMaxDiceAmount(rawCategoriesLength);

        expectObservable(viewModel.currentDiceAmount$).toBe('a', { a: currentLengthOnEnter });
        expectObservable(viewModel.maxDiceAmount$).toBe('a', { a: maxMock });
      });
    });

    test('Should update only _maxDiceAmount, when calculated new current  is equal to max', async () => {
      const currentLengthOnEnter = 9;
      const prepareMaxAmountMock = jest.fn().mockReturnValue(maxMock);
      viewModel['_prepareMaxAmount'] = prepareMaxAmountMock;

      testScheduler.run(async ({ expectObservable }) => {
        viewModel['_currentDiceAmount$'].next(currentLengthOnEnter);

        await viewModel.changeMaxDiceAmount(rawCategoriesLength);

        expectObservable(viewModel.currentDiceAmount$).toBe('a', { a: currentLengthOnEnter });
        expectObservable(viewModel.maxDiceAmount$).toBe('a', { a: maxMock });
      });
    });

    test('Should update _maxDiceAmount and _currentDiceAmount, when calculated new current  is greater than max', async () => {
      const currentLengthOnEnter = maxMock + 6;
      const prepareMaxAmountMock = jest.fn().mockReturnValue(maxMock);
      viewModel['_prepareMaxAmount'] = prepareMaxAmountMock;

      testScheduler.run(async ({ expectObservable }) => {
        viewModel['_currentDiceAmount$'].next(currentLengthOnEnter);

        await viewModel.changeMaxDiceAmount(rawCategoriesLength);

        expectObservable(viewModel.currentDiceAmount$).toBe('a', { a: maxMock });
        expectObservable(viewModel.maxDiceAmount$).toBe('a', { a: maxMock });
      });
    });
  });
});
