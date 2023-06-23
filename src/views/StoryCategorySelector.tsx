import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Typography } from '@mui/material';
import { EStoryCategory, TTranslations } from 'types';

const getStyles = (name: string, values: string[], theme: Theme) => ({
  fontWeight:
    values.indexOf(name) === -1
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
  categories: string[];
  values: string[];
  onChange: (values: EStoryCategory[]) => void;
};

export const StoryCategorySelector = ({ translations, categories, onChange, values }: Props) => {
  const theme = useTheme();

  const handleChange = ({ target: { value } }: SelectChangeEvent<Array<string>>) => {
    onChange(value as any as EStoryCategory[]);
  };

  return (
    <>
      <Typography gutterBottom color="primary">
        {translations.settingCategories}
      </Typography>

      <Select
        multiple
        value={values}
        onChange={handleChange}
        renderValue={renderValue}
        sx={{ width: '100%' }}
        error={!values.length}
      >
        {categories.map((key) => (
          <MenuItem key={key} value={key} style={getStyles(key, values, theme)}>
            {key}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};
