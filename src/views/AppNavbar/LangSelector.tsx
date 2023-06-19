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
    <FormControl>
      <InputLabel id="lang-selector-label">{translations.changeLang}</InputLabel>
      <Select
        labelId="lang-selector-label"
        id="lang-selector"
        value={value}
        label={translations.changeLang}
        onChange={handleChange}
        defaultValue={value}
      >
        {values.map(({ key, value }) => (
          <MenuItem key={key} value={key}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
