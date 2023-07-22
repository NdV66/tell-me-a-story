import { renderHook, render, screen } from '@testing-library/react';

import { SettingContext } from 'context';
import { MainPage, useMainPage } from 'pages';
import { settingsContextValueMock } from 'tests/mocks';

describe('MainPage - useMainPage', () => {
  const wrapper = ({ children }: any) => (
    <SettingContext.Provider value={settingsContextValueMock}>{children}</SettingContext.Provider>
  );

  test('Should prepare muiTheme based on values from context', () => {
    const { result } = renderHook(useMainPage, { wrapper });
    const { muiTheme } = result.current;

    expect(muiTheme.typography).toMatchObject({
      fontSize: settingsContextValueMock.theme.fontSize,
    });
    expect(muiTheme.palette).toMatchObject({
      mode: settingsContextValueMock.theme.name,
      primary: {
        main: settingsContextValueMock.theme.primary,
        contrastText: settingsContextValueMock.theme.background,
      },
      secondary: {
        main: settingsContextValueMock.theme.secondary,
        contrastText: settingsContextValueMock.theme.light,
      },
      background: {
        default: settingsContextValueMock.theme.background,
      },
    });
  });
});

describe('MainPage', () => {
  const renderMainPage = () =>
    render(
      <SettingContext.Provider value={settingsContextValueMock}>
        <MainPage />
      </SettingContext.Provider>,
    );

  test('Should render with all elements', () => {
    renderMainPage();

    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
