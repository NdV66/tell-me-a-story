import { TTranslations } from 'types';
import { IconsAmountSlider } from './IconsAmountSlider';
import { Box } from '@mui/material';

type Props = {
  translations: TTranslations;
};

export const SettingsArea = ({ translations }: Props) => {
  return (
    <Box>
      <IconsAmountSlider translations={translations} />
    </Box>
  );
};
