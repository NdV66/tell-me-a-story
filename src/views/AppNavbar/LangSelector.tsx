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
  backgroundColor: theme.palette.secondary.main,
  width: '90px',
  fontSize: theme.typography.fontSize * 0.9,
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  fontSize: theme.typography.fontSize * 0.9,
}));

export const LangSelector = ({ onChange, value, values }: Props) => {
  const handleChange = (event: SelectChangeEvent<any>) => {
    onChange(event.target.value as EAppLangs);
  };

  return (
    <StyledLangSelector
      id="lang-selector"
      variant="outlined"
      value={value}
      onChange={handleChange}
      defaultValue={value}
    >
      {values.map(({ key, value }) => (
        <StyledMenuItem key={key} value={key}>
          {value}
        </StyledMenuItem>
      ))}
    </StyledLangSelector>
  );
};
