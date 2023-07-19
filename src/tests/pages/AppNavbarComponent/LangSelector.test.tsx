import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TEST_IDS, TRANSLATIONS_EN, TRANSLATIONS_PL } from 'data';
import { LangSelector } from 'pages/AppNavbarComponent/LangSelector';
import { EAppLangs } from 'types';

const props = {
  value: EAppLangs.EN,
  onChange: jest.fn(),
  values: [
    { key: EAppLangs.EN, value: TRANSLATIONS_EN.lang },
    { key: EAppLangs.PL, value: TRANSLATIONS_PL.lang },
  ],
};

describe('LangSelector', () => {
  const renderElement = () => render(<LangSelector {...props} />);

  test('Should render', () => {
    renderElement();
    const langButton = screen.getByTestId(TEST_IDS.LangSelector);

    expect(langButton).toBeInTheDocument();
    expect(langButton).toHaveTextContent(TRANSLATIONS_EN.lang);
  });

  test('Should handle onChange', async () => {
    renderElement();
    const langButton = screen.getByRole('button');

    expect(langButton).toHaveTextContent(TRANSLATIONS_EN.lang);
    userEvent.click(langButton);

    const option = screen.getByRole('option', { name: TRANSLATIONS_PL.lang });
    userEvent.click(option);

    expect(props.onChange).toHaveBeenCalled();
    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(props.onChange).toHaveBeenCalledWith(EAppLangs.PL);
  });
});
