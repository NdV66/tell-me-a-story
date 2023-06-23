import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Typography } from '@mui/material';
import { TTranslations } from 'types';

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner1',
  'Omar Alexander2',
  'Carlos Abbott3',
  'Miriam Wagner4',
];

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
};

export const StoryCategorySelector = ({ translations }: Props) => {
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
        {names.map((name) => (
          <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};
