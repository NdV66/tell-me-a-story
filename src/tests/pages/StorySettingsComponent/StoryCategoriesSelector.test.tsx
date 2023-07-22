import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
  waitForElementToBeRemoved,
  waitFor,
} from '@testing-library/react';
import { Theme } from '@mui/material/styles';
import { SelectChangeEvent } from '@mui/material';
import { Subject } from 'rxjs';

import { settingsContextValueMock, storyCategoriesViewComponentMock, wrapper } from 'tests/mocks';
import {
  StoryCategoriesSelector,
  useStoryCategoriesSelector,
} from 'pages/StorySettingsComponent/StoryCategoriesSelector';
import { EStoryCategory } from 'types';
import { SettingContext } from 'context';
import userEvent from '@testing-library/user-event';

const expectedCategories = [EStoryCategory.BOTTLES, EStoryCategory.FOOD];
const { translations } = settingsContextValueMock;

const checkExpectedCategoriesChips = () => {
  expectedCategories.forEach((key) => {
    const text = translations.categoriesByKeys[key];
    expect(screen.getByText(text)).toBeInTheDocument();
  });
};

describe('StoryCategoriesSelector - useStoryCategoriesSelector', () => {
  let currentCategories$: Subject<EStoryCategory[]>;

  beforeEach(() => {
    currentCategories$ = new Subject();
    storyCategoriesViewComponentMock.currentCategories$ = currentCategories$;
  });

  const renderElement = () =>
    renderHook(() => useStoryCategoriesSelector(storyCategoriesViewComponentMock), {
      wrapper,
    });

  test('Should return all data for the component', () => {
    const { result } = renderElement();

    act(() => currentCategories$.next(expectedCategories));

    expect(result.current.diceSettings).toEqual(storyCategoriesViewComponentMock.diceSettings);
    expect(result.current.translations).toEqual(translations);
    expect(result.current.currentCategories).toEqual(expectedCategories);
    expect(typeof result.current.getItemStyles).toBe('function');
    expect(typeof result.current.handleChange).toBe('function');
    expect(typeof result.current.renderValue).toBe('function');
    expect(typeof result.current.translateCategoryByKey).toBe('function');
  });

  test('translateCategoryByKey()', () => {
    const { result } = renderElement();
    act(() => currentCategories$.next(expectedCategories));

    const data = result.current.translateCategoryByKey(expectedCategories[0]);
    expect(data).toEqual(translations.categoriesByKeys[expectedCategories[0]]);
  });

  test('renderValue()', () => {
    const { result } = renderElement();
    render(result.current.renderValue(expectedCategories));
    checkExpectedCategoriesChips();
  });

  test('handleChange()', () => {
    const expectedValue = EStoryCategory.CREATURES;
    const { result } = renderElement();

    result.current.handleChange({ target: { value: expectedValue } } as SelectChangeEvent<
      string[]
    >);

    expect(storyCategoriesViewComponentMock.changeCategories).toHaveBeenCalled();
    expect(storyCategoriesViewComponentMock.changeCategories).toHaveBeenCalledTimes(1);
    expect(storyCategoriesViewComponentMock.changeCategories).toHaveBeenCalledWith(expectedValue);
  });

  describe('getItemStyles()', () => {
    test('- the value is not included', () => {
      const value = EStoryCategory.CREATURES;
      const expectedTypography = 22;
      const themeMock = {
        typography: { fontWeightRegular: expectedTypography },
      } as Theme;
      const { result } = renderElement();

      const data = result.current.getItemStyles(value, expectedCategories, themeMock);
      expect(data).toEqual({ fontWeight: expectedTypography });
    });

    test('- the value is included', () => {
      const value = expectedCategories[0];
      const expectedTypography = 22;
      const themeMock = {
        typography: { fontWeightBold: expectedTypography },
      } as Theme;
      const { result } = renderElement();

      const data = result.current.getItemStyles(value, expectedCategories, themeMock);
      expect(data).toEqual({ fontWeight: expectedTypography });
    });
  });
});

describe('StoryCategoriesSelector', () => {
  let currentCategories$: Subject<EStoryCategory[]>;

  beforeEach(() => {
    currentCategories$ = new Subject();
    storyCategoriesViewComponentMock.currentCategories$ = currentCategories$;
  });

  const renderElement = () =>
    render(
      <SettingContext.Provider value={settingsContextValueMock}>
        <StoryCategoriesSelector viewComponent={storyCategoriesViewComponentMock} />
      </SettingContext.Provider>,
    );

  test('Should render with all elements (with selected categories)', () => {
    renderElement();
    act(() => currentCategories$.next(expectedCategories));

    expect(screen.getByText(translations.settingCategories)).toBeInTheDocument();
    checkExpectedCategoriesChips();
  });

  test('Should render with all elements (with no selected categories)', () => {
    renderElement();
    act(() => currentCategories$.next([]));

    expect(screen.getByText(translations.settingCategories)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('Should show and then close categories list to select (show and close listbox)', async () => {
    const elementText = translations.categoriesByKeys[expectedCategories[0]];
    const expectedCategoriesListLength =
      storyCategoriesViewComponentMock.diceSettings.categoriesKeys.length;

    renderElement();
    act(() => currentCategories$.next([]));

    expect(screen.queryByText(elementText)).not.toBeInTheDocument();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

    //click selector to show list
    expect(screen.getByRole('button')).toBeInTheDocument();
    userEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getAllByRole('option').length).toBe(expectedCategoriesListLength);

    // close list
    // eslint-disable-next-line
    fireEvent.keyDown(document.activeElement!, {
      key: 'Escape',
      code: 'Escape',
    });

    await waitForElementToBeRemoved(screen.queryByText(elementText));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(screen.queryAllByRole('option').length).toBe(0);
  });
});
