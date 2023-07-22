import { render, screen } from '@testing-library/react';
import { SettingContext } from 'context';
import { TEST_IDS } from 'data';
import { HomePage } from 'pages/HomePage';
import {
  diceAmountViewComponentMock,
  settingsContextValueMock,
  storyCategoriesViewComponentMock,
  diceAreaViewComponentMock,
  homePageViewModelMock,
} from 'tests/mocks';

const props = {
  viewModel: homePageViewModelMock,
  diceAreaViewComponent: diceAreaViewComponentMock,
  diceAmountViewComponent: diceAmountViewComponentMock,
  storyCategoriesViewComponent: storyCategoriesViewComponentMock,
};

describe('HomePage', () => {
  const renderPage = () =>
    render(
      <SettingContext.Provider value={settingsContextValueMock}>
        <HomePage {...props} />
      </SettingContext.Provider>,
    );

  test('Should render with all elements', () => {
    renderPage();
    expect(screen.getByTestId(TEST_IDS.HomePage)).toBeInTheDocument();
  });
});
