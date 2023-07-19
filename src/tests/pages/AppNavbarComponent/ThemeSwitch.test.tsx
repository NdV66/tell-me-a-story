import { act, fireEvent, render, screen } from '@testing-library/react';

import { DARK_THEME, TEST_IDS } from 'data';
import { ThemeSwitch } from 'pages/AppNavbarComponent/ThemeSwitch';

const props = {
  theme: DARK_THEME,
  onChange: jest.fn(),
  checked: false,
};

describe('ThemeSwitch', () => {
  const renderElement = () => render(<ThemeSwitch {...props} />);

  test('Should render', () => {
    renderElement();
    expect(screen.getByTestId(TEST_IDS.ThemeSwitch)).toBeInTheDocument();
  });

  test('Should handle onChange', () => {
    renderElement();
    const expectedValueAfterChange = !props.checked;
    const element = screen.getByRole('checkbox');

    fireEvent.click(element);
    fireEvent.change(element, { target: { checked: expectedValueAfterChange } });

    expect(props.onChange).toHaveBeenCalled();
    expect(props.onChange).toHaveBeenCalledWith(expectedValueAfterChange);
  });
});
