import { render } from '@testing-library/react';
import { StorySettingsComponent } from 'pages/StorySettingsComponent';
import { diceAmountViewComponentMock, storyCategoriesViewComponentMock } from 'tests/mocks';

const props = {
  onClickReroll: jest.fn(),
  diceAmountViewComponent: diceAmountViewComponentMock,
  storyCategoriesViewComponent: storyCategoriesViewComponentMock,
};

describe('StorySettingsComponent', () => {
  const renderElement = () => render(<StorySettingsComponent {...props} />);
});
