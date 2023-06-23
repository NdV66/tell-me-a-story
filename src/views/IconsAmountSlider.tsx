import { Slider, Typography, styled } from '@mui/material';
import { TTranslations } from 'types';

type Props = {
  translations: TTranslations;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
};

const prepareMarks = (min: number, max: number, step: number) => {
  const result = [];

  for (let i = min; i <= max; i += step) {
    result.push({
      value: i,
      label: i,
    });
  }

  return result;
};

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
        marks={prepareMarks(min, max, step)}
        min={min}
        max={max}
        value={value}
        onChange={handleOnChange}
      />
    </>
  );
};
