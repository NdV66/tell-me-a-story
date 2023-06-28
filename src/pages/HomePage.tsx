import { Box, Container } from '@mui/material';
import {
  IDiceAreaViewComponent,
  IHomePageViewModel,
  IDiceAmountViewComponent,
  IStoryCategoriesViewComponent,
} from 'viewModels';

import { DiceAreaComponent } from './DiceAreaComponent';
import { IconsAmountSlider } from './IconsAmountSlider';
import { StoryCategoriesSelector } from './StoryCategoriesSelector';

type Props = {
  viewModel: IHomePageViewModel;
  diceAreaViewComponent: IDiceAreaViewComponent;
  diceAmountViewComponent: IDiceAmountViewComponent;
  storyCategoriesViewComponent: IStoryCategoriesViewComponent;
};

export const HomePage = ({
  diceAreaViewComponent,
  diceAmountViewComponent,
  storyCategoriesViewComponent,
}: Props) => (
  <Container
    maxWidth="md"
    sx={{ minHeight: 'calc(100vh - 24px - 24px - 24px - 105px)', paddingTop: '32px' }}
  >
    <IconsAmountSlider viewComponent={diceAmountViewComponent} />

    <Box sx={{ marginTop: '32px' }}>
      <StoryCategoriesSelector viewComponent={storyCategoriesViewComponent} />
    </Box>

    <Box sx={{ marginBottom: '48px', marginTop: '32px' }}>
      <DiceAreaComponent viewComponent={diceAreaViewComponent} />
    </Box>
  </Container>
);
