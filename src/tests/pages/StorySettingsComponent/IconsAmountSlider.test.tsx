import { renderHook, render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SettingContext } from 'context';
import {
  IconsAmountSlider,
  useIconsAmountSlider,
} from 'pages/StorySettingsComponent/IconsAmountSlider';
import { prepareMarks } from 'pages/StorySettingsComponent/helper';
import { act } from 'react-dom/test-utils';
import { Subject } from 'rxjs';
import { diceAmountViewComponentMock, settingsContextValueMock } from 'tests/mocks';

const wrapper = ({ children }: any) => (
  <SettingContext.Provider value={settingsContextValueMock}>{children}</SettingContext.Provider>
);

const { translations } = settingsContextValueMock;
const expectedMaxDiceAmount = 6;
const expectedCurrentDiceAmount = 4;

describe('IconsAmountSlider - useIconsAmountSlider', () => {
  const renderElement = () =>
    renderHook(() => useIconsAmountSlider(diceAmountViewComponentMock), {
      wrapper,
    });

  test('Should return data', () => {
    const maxDiceAmountMock$ = new Subject<number>();
    const currentDiceAmountMock$ = new Subject<number>();

    diceAmountViewComponentMock.maxDiceAmount$ = maxDiceAmountMock$;
    diceAmountViewComponentMock.currentDiceAmount$ = currentDiceAmountMock$;

    const { result } = renderElement();

    act(() => {
      maxDiceAmountMock$.next(expectedMaxDiceAmount);
      currentDiceAmountMock$.next(expectedCurrentDiceAmount);
    });

    expect(result.current.translations).toEqual(translations);
    expect(result.current.maxDiceAmount).toBe(expectedMaxDiceAmount);
    expect(result.current.currentDiceAmount).toBe(expectedCurrentDiceAmount);
    expect(result.current.diceSettings).toEqual(diceAmountViewComponentMock.diceSettings);
    expect(typeof result.current.handleOnChange).toBe('function'); //because expect.any(Function) is weird for returned functions
  });

  test('Should call changeDiceAmount() from viewComponent when handleOnChange() is called', () => {
    const expectedValue = 5;
    const { result } = renderElement();

    result.current.handleOnChange({} as any, expectedValue);

    expect(diceAmountViewComponentMock.changeDiceAmount).toHaveBeenCalled();
    expect(diceAmountViewComponentMock.changeDiceAmount).toHaveBeenCalledWith(expectedValue);
  });
});

describe('IconsAmountSlider', () => {
  let maxDiceAmountMock$: Subject<number>;
  let currentDiceAmountMock$: Subject<number>;

  const renderElement = () =>
    render(
      <SettingContext.Provider value={settingsContextValueMock}>
        <IconsAmountSlider viewComponent={diceAmountViewComponentMock} />
      </SettingContext.Provider>,
    );

  beforeEach(() => {
    maxDiceAmountMock$ = new Subject<number>();
    currentDiceAmountMock$ = new Subject<number>();

    diceAmountViewComponentMock.maxDiceAmount$ = maxDiceAmountMock$;
    diceAmountViewComponentMock.currentDiceAmount$ = currentDiceAmountMock$;
  });

  test('Should render correctly with all marks', () => {
    const { diceSettings } = diceAmountViewComponentMock;
    renderElement();

    const expectedMarks = prepareMarks(
      diceSettings.minDice,
      expectedMaxDiceAmount,
      diceSettings.stepDice,
    ).map(({ label }) => label);

    act(() => {
      maxDiceAmountMock$.next(expectedMaxDiceAmount);
      currentDiceAmountMock$.next(expectedCurrentDiceAmount);
    });

    expect(screen.getByText(translations.settingsDice)).toBeInTheDocument();
    expectedMarks.forEach((mark) => {
      expect(screen.getByText(mark)).toBeInTheDocument();
    });
  });

  test('Should handle change of a dice amount', async () => {
    const expectedMark = diceAmountViewComponentMock.diceSettings.minDice;
    const { container } = renderElement();

    act(() => {
      maxDiceAmountMock$.next(expectedMaxDiceAmount);
      currentDiceAmountMock$.next(expectedCurrentDiceAmount);
    });

    const element = await container.querySelector('input[type="range"]'); // eslint-disable-line
    fireEvent.change(element!, { target: { value: expectedMark } });

    expect(element).toBeInTheDocument();
    expect(diceAmountViewComponentMock.changeDiceAmount).toHaveBeenCalled();
    expect(diceAmountViewComponentMock.changeDiceAmount).toHaveBeenCalledTimes(1);
    expect(diceAmountViewComponentMock.changeDiceAmount).toHaveBeenCalledWith(expectedMark);
  });
});
