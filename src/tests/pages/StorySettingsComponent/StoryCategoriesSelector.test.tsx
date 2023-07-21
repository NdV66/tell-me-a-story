import { act, render, renderHook, screen } from '@testing-library/react';

import { settingsContextValueMock, storyCategoriesViewComponentMock, wrapper } from 'tests/mocks';
import { useStoryCategoriesSelector } from 'pages/StorySettingsComponent/StoryCategoriesSelector';
import { Subject } from 'rxjs';
import { EStoryCategory } from 'types';

const expectedCategories = [EStoryCategory.BOTTLES, EStoryCategory.FOOD];
const { translations } = settingsContextValueMock;

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

    expectedCategories.forEach((key) => {
      const text = translations.categoriesByKeys[key];
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });
});
