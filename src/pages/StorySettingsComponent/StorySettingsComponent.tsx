import { Box, Button } from '@mui/material';
import { IconsAmountSlider } from './IconsAmountSlider';
import { StoryCategoriesSelector } from 'pages/StorySettingsComponent/StoryCategoriesSelector';
import { useSettingsContext } from 'context';
import { IDiceAmountViewComponent, IStoryCategoriesViewComponent } from 'viewModels';

type Props = {
  onClickReroll: () => void;
  diceAmountViewComponent: IDiceAmountViewComponent;
  storyCategoriesViewComponent: IStoryCategoriesViewComponent;
};

export const StorySettingsComponent = ({
  onClickReroll,
  diceAmountViewComponent,
  storyCategoriesViewComponent,
}: Props) => {
  const { translations } = useSettingsContext();

  return (
    <>
      <IconsAmountSlider viewComponent={diceAmountViewComponent} />

      <Box sx={{ marginTop: '32px' }}>
        <StoryCategoriesSelector viewComponent={storyCategoriesViewComponent} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
        <Button onClick={onClickReroll}>{translations.reroll}</Button>
      </Box>
    </>
  );
};
