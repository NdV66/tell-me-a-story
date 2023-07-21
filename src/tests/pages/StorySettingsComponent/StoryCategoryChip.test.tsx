import { render, screen } from '@testing-library/react';

import { StoryCategoryChip } from 'pages/StorySettingsComponent/StoryCategoryChip';
import { EStoryCategory } from 'types';

const expectedCategory1 = 'bottles';
const expectedCategory2 = 'food';

describe('StoryCategoryChip', () => {
  test('Should render correctly', async () => {
    const props = {
      selected: [EStoryCategory.BOTTLES, EStoryCategory.FOOD],
      translateCategoryByKey: jest
        .fn()
        .mockReturnValueOnce(expectedCategory1)
        .mockReturnValueOnce(expectedCategory2),
    };

    render(<StoryCategoryChip {...props} />);

    expect(props.translateCategoryByKey).toHaveBeenCalled();
    expect(props.translateCategoryByKey).toHaveBeenCalledTimes(props.selected.length);
    expect(props.translateCategoryByKey).toHaveBeenNthCalledWith(1, expectedCategory1);
    expect(props.translateCategoryByKey).toHaveBeenNthCalledWith(2, expectedCategory2);
    expect(screen.getByText(expectedCategory1)).toBeInTheDocument();
    expect(screen.getByText(expectedCategory2)).toBeInTheDocument();
  });
});
