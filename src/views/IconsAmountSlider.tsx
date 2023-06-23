import { Box, Slider, Typography } from '@mui/material';
import { TTranslations } from 'types';

type Props = {
  translations: TTranslations;
};

export const IconsAmountSlider = ({ translations }: Props) => {
  const valuetext = (value: number) => {
    return `${value}°C`;
  };

  return (
    <Box>
      <Typography gutterBottom color="primary">
        {translations.settingsDice}
      </Typography>

      <Slider
        aria-label="XXXX"
        defaultValue={9}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={12}
      />
    </Box>
  );
};
