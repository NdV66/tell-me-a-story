import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Typography } from '@mui/material';
import { EStoryCategory } from 'types';
import { IDiceCategoriesViewComponent } from 'viewModels';
import { useSettingsContext } from 'views';
import { useStateObservable } from 'tools';

type Props = {
  viewComponent: IDiceCategoriesViewComponent;
};

const useStoryCategorySelector = (viewComponent: IDiceCategoriesViewComponent) => {
  const { translations } = useSettingsContext();
  const currentCategories = useStateObservable(viewComponent.currentCategories$);

  const renderValue = (selected: string[]) => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
      {selected.map((value) => (
        <Chip key={value} label={value} />
      ))}
    </Box>
  );

  const getItemStyles = (value: string, values: string[], theme: Theme) => ({
    fontWeight:
      values.indexOf(value) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  });

  const handleChange = ({ target: { value } }: SelectChangeEvent<string[]>) => {
    viewComponent.changeCategories(value as any as EStoryCategory[]);
  };

  return {
    renderValue,
    getItemStyles,
    translations,
    currentCategories,
    handleChange,
    diceSettings: viewComponent.diceSettings,
  };
};

export const StoryCategorySelector = ({ viewComponent }: Props) => {
  const theme = useTheme();
  const {
    getItemStyles,
    renderValue,
    currentCategories,
    translations,
    diceSettings,
    handleChange,
  } = useStoryCategorySelector(viewComponent);

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
          error={!currentCategories.length}
        >
          {diceSettings.categoriesKeys.map((key) => (
            <MenuItem
              key={key}
              value={key}
              style={getItemStyles(key, diceSettings.categoriesKeys, theme)}
            >
              {key}
            </MenuItem>
          ))}
        </Select>
      )}
    </>
  );
};
