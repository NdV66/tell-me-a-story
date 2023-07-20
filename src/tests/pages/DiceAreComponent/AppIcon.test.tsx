import { render, screen } from '@testing-library/react';
import { AppIcon } from 'pages/DiceAreaComponent/AppIcon';

const props = {
  icon: 'icon6',
};

const expectedClasses = `ra ra-${props.icon} ra-fw`;

describe('AppIcon', () => {
  const renderComponent = (role?: string) => render(<AppIcon {...props} role={role} />);

  test('Should render correctly', () => {
    renderComponent();
    const element = screen.getByRole('gridcell');

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass(expectedClasses);
  });

  test('Should render correctly with a non-default role', () => {
    const role = 'otherRole';
    renderComponent(role);
    const element = screen.getByRole(role);

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass(expectedClasses);
  });
});
