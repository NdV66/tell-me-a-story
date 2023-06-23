import { TTranslations } from 'types';
import { IconsAmountSlider } from './IconsAmountSlider';
import { Box } from '@mui/material';
import { StoryCategorySelector } from './StoryCategorySelector';

type Props = {
  translations: TTranslations;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
};

export const SettingsArea = (props: Props) => (
  <Box>
    <Box>
      <IconsAmountSlider {...props} />
    </Box>

    <Box>
      <StoryCategorySelector translations={props.translations} />
    </Box>
  </Box>
);
