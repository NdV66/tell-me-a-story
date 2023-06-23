import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Typography } from '@mui/material';
import { EStoryCategory, TTranslations } from 'types';

const getStyles = (name: string, personName: readonly string[], theme: Theme) => ({
  fontWeight:
    personName.indexOf(name) === -1
      ? theme.typography.fontWeightRegular
      : theme.typography.fontWeightMedium,
});

const renderValue = (selected: string[]) => (
  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
    {selected.map((value) => (
      <Chip key={value} label={value} />
    ))}
  </Box>
);

type Props = {
  translations: TTranslations;
  categories: Array<string>;
};

export const StoryCategorySelector = ({ translations, categories }: Props) => {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = ({ target: { value } }: SelectChangeEvent<typeof personName>) => {
    setPersonName(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <>
      <Typography gutterBottom color="primary">
        {translations.settingCategories}
      </Typography>

      <Select
        multiple
        value={personName}
        onChange={handleChange}
        renderValue={renderValue}
        sx={{ width: '100%' }}
      >
        {categories.map((key) => (
          <MenuItem key={key} value={key} style={getStyles(key, personName, theme)}>
            {translations.categoriesByKeys[(EStoryCategory as any)[key]]}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};
