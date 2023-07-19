import { renderHook, render, screen } from '@testing-library/react';

import { ISettingContext, SettingContext } from 'context';
import { DARK_THEME, TEST_IDS, TRANSLATIONS_EN, TRANSLATIONS_PL } from 'data';
import { MainPage, useMainPage } from 'pages';
import { EAppLangs, EAppTheme } from 'types';

const value: ISettingContext = {
  theme: DARK_THEME,
  translations: TRANSLATIONS_EN,
  appLang: EAppLangs.EN,
  appTheme: EAppTheme.DARK,
  isDefaultAppTheme: true,
  availableTranslations: [
    { key: EAppLangs.EN, value: TRANSLATIONS_EN.lang },
    { key: EAppLangs.PL, value: TRANSLATIONS_PL.lang },
  ],

  changeLang: jest.fn(),
  changeAppTheme: jest.fn(),
};

describe('MainPage - useMainPage', () => {
  const wrapper = ({ children }: any) => (
    <SettingContext.Provider value={value}>{children}</SettingContext.Provider>
  );

  test('Should prepare muiTheme based on values from context', () => {
    const { result } = renderHook(useMainPage, { wrapper });
    const { muiTheme } = result.current;

    expect(muiTheme.typography).toMatchObject({ fontSize: value.theme.fontSize });
    expect(muiTheme.palette).toMatchObject({
      mode: value.theme.name,
      primary: {
        main: value.theme.primary,
        contrastText: value.theme.background,
      },
      secondary: {
        main: value.theme.secondary,
        contrastText: value.theme.light,
      },
      background: {
        default: value.theme.background,
      },
    });
  });
});

describe('MainPage', () => {
  const renderMaiPage = () =>
    render(
      <SettingContext.Provider value={value}>
        <MainPage />
      </SettingContext.Provider>,
    );

  test('Should render with all elements', () => {
    renderMaiPage();

    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
