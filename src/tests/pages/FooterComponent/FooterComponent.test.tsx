import { render, screen } from '@testing-library/react';

import { SettingContext } from 'context';
import { TEST_IDS } from 'data';
import { FooterComponent } from 'pages/FooterComponent';
import { settingsContextValueMock } from 'tests/mocks';

describe('FooterComponent', () => {
  const renderPage = () =>
    render(
      <SettingContext.Provider value={settingsContextValueMock}>
        <FooterComponent />
      </SettingContext.Provider>,
    );

  test('Should render with all elements', () => {
    renderPage();
    const { translations } = settingsContextValueMock;
    const authorElement = screen.getByText(translations.author) as HTMLAnchorElement;
    const repoElement = screen.getByText(translations.repo) as HTMLAnchorElement;
    const githubElement = screen.getByText(translations.github) as HTMLAnchorElement;

    expect(screen.getByTestId(TEST_IDS.FooterComponent)).toBeInTheDocument();
    expect(authorElement).toBeInTheDocument();
    expect(authorElement.href).toContain(translations.lnLink);
    expect(repoElement).toBeInTheDocument();
    expect(repoElement.href).toContain(translations.repoLink);
    expect(githubElement).toBeInTheDocument();
    expect(githubElement.href).toContain(translations.githubLink);
  });
});
