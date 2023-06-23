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
  categories: Array<string>;
  currentCategories: Array<string>;
  onChangeCategories: (values: Array<string>) => void;
};

export const SettingsArea = (props: Props) => (
  <Box>
    <Box>
      <IconsAmountSlider {...props} />
    </Box>

    <Box sx={{ marginTop: '32px' }}>
      <StoryCategorySelector
        translations={props.translations}
        categories={props.categories}
        onChange={props.onChangeCategories}
        values={props.currentCategories}
      />
    </Box>
  </Box>
);
