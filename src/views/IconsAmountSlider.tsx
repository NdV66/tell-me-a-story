import { Box, Slider, Typography, styled } from '@mui/material';
import { TTranslations } from 'types';

type Props = {
  translations: TTranslations;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
};

const marks = [
  {
    value: 3,
    label: '3',
  },
  {
    value: 6,
    label: '6',
  },
  {
    value: 9,
    label: '9',
  },
  {
    value: 12,
    label: '12',
  },
];

const StyledSlider = styled(Slider)(({ theme }) => ({
  '& .MuiSlider-markLabel': {
    color: theme.palette.primary.main,
  },
}));

export const IconsAmountSlider = ({ translations, min, max, step, value, onChange }: Props) => {
  const handleOnChange = (_: React.SyntheticEvent | Event, value: number | Array<number>) => {
    onChange(value as number);
  };

  return (
    <>
      <Typography gutterBottom color="primary">
        {translations.settingsDice}
      </Typography>

      <StyledSlider
        valueLabelDisplay="off"
        step={step}
        marks={marks}
        min={min}
        max={max}
        value={value}
        onChange={handleOnChange}
      />
    </>
  );
};
