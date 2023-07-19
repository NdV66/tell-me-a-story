const buildTestId = (name: string) => `${name}_testId`;

export const TEST_IDS = {
  MainPage: buildTestId('MainPage'),
  HomePage: buildTestId('HomePage'),
  AppNavbarComponent: buildTestId('AppNavbarComponent'),
  FooterComponent: buildTestId('FooterComponent'),
  ThemeSwitch: buildTestId('ThemeSwitch'),
};
