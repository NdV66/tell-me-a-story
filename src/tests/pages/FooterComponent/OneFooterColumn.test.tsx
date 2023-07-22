import { render, screen } from '@testing-library/react';
import { OneFooterColumn } from 'pages/FooterComponent/OneFooterColumn';

const props = {
  link: 'http://test.com',
  title: 'Test text here',
};

describe('OneFooterColumn', () => {
  const renderElement = () => render(<OneFooterColumn {...props} />);

  test('Should render with all elements', () => {
    renderElement();
    const link = screen.getByRole('link') as HTMLAnchorElement;

    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(link.href).toContain(props.link);
  });
});
