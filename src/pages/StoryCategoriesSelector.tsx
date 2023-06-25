import { Theme, useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Typography } from '@mui/material';
import { EStoryCategory } from 'types';
import { IStoryCategoriesViewComponent } from 'viewModels';
import { useSettingsContext } from 'views';
import { useStateObservable } from 'tools';
import { StoryCategoryChip } from './StoryCategoryChip';

type Props = {
  viewComponent: IStoryCategoriesViewComponent;
};

const useStoryCategoriesSelector = (viewComponent: IStoryCategoriesViewComponent) => {
  const { translations } = useSettingsContext();
  const currentCategories = useStateObservable(viewComponent.currentCategories$);

  const translateCategoryByKey = (category: EStoryCategory) =>
    translations.categoriesByKeys[category];

  const renderValue = (selected: string[]) => (
    <StoryCategoryChip
      selected={selected as EStoryCategory[]}
      translateCategoryByKey={translateCategoryByKey}
    />
  );

  const getItemStyles = (value: string, values: string[], theme: Theme) => ({
    fontWeight: values.includes(value)
      ? theme.typography.fontWeightBold
      : theme.typography.fontWeightRegular,
  });

  const handleChange = ({ target: { value } }: SelectChangeEvent<string[]>) => {
    viewComponent.changeCategories(value as EStoryCategory[]);
  };

  return {
    renderValue,
    getItemStyles,
    translations,
    currentCategories,
    handleChange,
    translateCategoryByKey,
    diceSettings: viewComponent.diceSettings,
  };
};

export const StoryCategoriesSelector = ({ viewComponent }: Props) => {
  const theme = useTheme();
  const {
    getItemStyles,
    renderValue,
    currentCategories,
    translations,
    diceSettings,
    handleChange,
    translateCategoryByKey,
  } = useStoryCategoriesSelector(viewComponent);

  return (
    <>
      <Typography gutterBottom color="primary">
        {translations.settingCategories}
      </Typography>

      {currentCategories && (
        <Select
          multiple
          value={currentCategories}
          onChange={(e) => handleChange(e)}
          renderValue={renderValue}
          sx={{ width: '100%' }}
          variant="outlined"
        >
          {diceSettings.categoriesKeys.map((key) => (
            <MenuItem key={key} value={key} style={getItemStyles(key, currentCategories, theme)}>
              {translateCategoryByKey(key as EStoryCategory)}
            </MenuItem>
          ))}
        </Select>
      )}
    </>
  );
};
