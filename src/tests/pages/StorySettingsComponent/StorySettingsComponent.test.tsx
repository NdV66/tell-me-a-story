import { render, screen } from '@testing-library/react';
import { SettingContext } from 'context';
import { StorySettingsComponent } from 'pages/StorySettingsComponent';
import {
  diceAmountViewComponentMock,
  settingsContextValueMock,
  storyCategoriesViewComponentMock,
} from 'tests/mocks';

const props = {
  onClickReroll: jest.fn(),
  diceAmountViewComponent: diceAmountViewComponentMock,
  storyCategoriesViewComponent: storyCategoriesViewComponentMock,
};

describe('StorySettingsComponent', () => {
  const renderElement = () =>
    render(
      <SettingContext.Provider value={settingsContextValueMock}>
        <StorySettingsComponent {...props} />
      </SettingContext.Provider>,
    );

  test('Should render', () => {
    const { translations } = settingsContextValueMock;
    renderElement();

    expect(screen.getByText(translations.settingsDice)).toBeInTheDocument();
    expect(screen.getByText(translations.settingCategories)).toBeInTheDocument();
  });
});
