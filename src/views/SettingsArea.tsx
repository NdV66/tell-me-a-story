import { TTranslations } from 'types';
import { IconsAmountSlider } from './IconsAmountSlider';
import { Box } from '@mui/material';

type Props = {
  translations: TTranslations;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
};

export const SettingsArea = (props: Props) => {
  return (
    <Box>
      <IconsAmountSlider {...props} />
    </Box>
  );
};
