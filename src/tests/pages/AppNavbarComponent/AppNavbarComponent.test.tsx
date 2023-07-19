import { render, screen } from '@testing-library/react';
import { SettingContext } from 'context';
import { TEST_IDS } from 'data';
import { AppNavbarComponent } from 'pages/AppNavbarComponent';

import { settingsContextValueMock } from 'tests/mocks';

describe('AppNavbarComponent', () => {
  const renderPage = () =>
    render(
      <SettingContext.Provider value={settingsContextValueMock}>
        <AppNavbarComponent />
      </SettingContext.Provider>,
    );

  test('Should render with all elements', () => {
    renderPage();
    const appNameElement = screen.getByText(settingsContextValueMock.translations.appName);
    const langSelectorElement = screen.getByText(settingsContextValueMock.translations.lang);

    expect(screen.getByTestId(TEST_IDS.AppNavbarComponent)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_IDS.ThemeSwitch)).toBeInTheDocument();
    expect(appNameElement).toBeInTheDocument();
    expect(langSelectorElement).toBeInTheDocument();
  });
});
