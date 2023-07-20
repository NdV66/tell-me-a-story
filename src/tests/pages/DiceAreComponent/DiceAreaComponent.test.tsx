import { render, renderHook, screen, waitFor } from '@testing-library/react';
import { Subject } from 'rxjs';
import { act } from 'react-dom/test-utils';

import { SettingContext } from 'context';
import { DiceAreaComponent, useDiceAreaComponent } from 'pages/DiceAreaComponent';
import { diceAreaViewComponentMock, settingsContextValueMock } from 'tests/mocks';
import { TEST_IDS } from 'data';

const expectedDices = ['icon1', 'icon2'];

describe('DiceAreaComponent - useDiceAreaComponent', () => {
  describe('MainPage - useMainPage', () => {
    const wrapper = ({ children }: any) => (
      <SettingContext.Provider value={settingsContextValueMock}>{children}</SettingContext.Provider>
    );

    test('Should return data for the component', () => {
      const currentDice$ = new Subject<string[]>();
      diceAreaViewComponentMock.currentDice$ = currentDice$;

      const { result } = renderHook(() => useDiceAreaComponent(diceAreaViewComponentMock), {
        wrapper,
      });

      //update RxJS inside act() seems to be a good way
      act(() => currentDice$.next(expectedDices));
      expect(result.current.currentDice).toEqual(expectedDices);
    });
  });
});

describe('DiceAreaComponent', () => {
  let currentDice$: Subject<string[]>;
  const renderComponent = () =>
    render(<DiceAreaComponent viewComponent={diceAreaViewComponentMock} />);

  beforeEach(() => {
    currentDice$ = new Subject();
    diceAreaViewComponentMock.currentDice$ = currentDice$;
  });

  test('Should render correctly with no icons', async () => {
    renderComponent();
    act(() => currentDice$.next([]));

    const icons = screen.queryAllByRole('gridcell');
    expect(screen.getByTestId(TEST_IDS.DiceAreaComponent)).toBeInTheDocument();
    expect(icons.length).toBe(0);
  });

  test('Should render correctly with icons', async () => {
    renderComponent();
    act(() => currentDice$.next(expectedDices));

    const icons = screen.queryAllByRole('gridcell');
    expect(screen.getByTestId(TEST_IDS.DiceAreaComponent)).toBeInTheDocument();
    expect(icons.length).toBe(expectedDices.length);
  });
});
