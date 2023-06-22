import { styled } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { EAppLangs } from 'types';

type Props = {
  value: EAppLangs;
  onChange: (lang: EAppLangs) => void;
  values: Array<{ key: EAppLangs; value: string }>;
};

const StyledLandSelector = styled(Select)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  width: '100px',
}));

export const LangSelector = ({ onChange, value, values }: Props) => {
  const handleChange = (event: SelectChangeEvent<any>) => {
    onChange(event.target.value as EAppLangs);
  };

  return (
    <StyledLandSelector
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
    </StyledLandSelector>
  );
};
