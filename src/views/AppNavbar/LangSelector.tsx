import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import { EAppLangs } from 'types';

type Props = {
  value: EAppLangs;
  onChange: (lang: EAppLangs) => void;
  values: Array<{ key: EAppLangs; value: string }>;
};

export const LangSelector = ({ onChange, value, values }: Props) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as EAppLangs);
  };

  return (
    <Select
      id="lang-selector"
      variant="outlined"
      value={value}
      onChange={handleChange}
      defaultValue={value}
    >
      {values.map(({ key, value }) => (
        <MenuItem key={key} value={key}>
          {value}
        </MenuItem>
      ))}
    </Select>
  );
};
