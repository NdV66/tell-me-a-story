import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { EAppLangs, TTranslations } from 'types';

type Props = {
  value: EAppLangs;
  onChange: (lang: EAppLangs) => void;
  values: Array<{ key: EAppLangs; value: string }>;
  translations: TTranslations;
};

export const LangSelector = ({ onChange, value, values, translations }: Props) => {
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
