import { styled } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { EAppLangs } from 'types';

type Props = {
  value: EAppLangs;
  onChange: (lang: EAppLangs) => void;
  values: Array<{ key: EAppLangs; value: string }>;
};

const StyledLangSelector = styled(Select)(({ theme }) => ({
  '& .MuiSelect-select': {
    color: theme.palette.primary.dark,
    background: theme.palette.background,
    fontWeight: theme.typography.fontWeightBold,
  },
}));

export const LangSelector = ({ onChange, value, values }: Props) => {
  const handleChange = (event: SelectChangeEvent<any>) => {
    onChange(event.target.value as EAppLangs);
  };

  return (
    <StyledLangSelector
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
    </StyledLangSelector>
  );
};
