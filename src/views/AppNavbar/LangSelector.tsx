import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { EAppLangs } from 'types';

type Props = {
  value: EAppLangs;
  onChange: (lang: EAppLangs) => void;
  values: Array<{ key: EAppLangs; value: string }>;
};

export const LangSelector = ({ onChange, value, values }: Props) => {
  const handleChange = (event: SelectChangeEvent<any>) => {
    onChange(event.target.value as EAppLangs);
  };

  return (
    <Select
      variant="outlined"
      value={value}
      onChange={handleChange}
      defaultValue={value}
      sx={{ width: '88px' }}
    >
      {values.map(({ key, value }) => (
        <MenuItem key={key} value={key}>
          {value}
        </MenuItem>
      ))}
    </Select>
  );
};
