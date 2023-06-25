import { Box, Container } from '@mui/material';
import {
  IDiceAreaViewComponent,
  IHomePageViewModel,
  IDiceAmountViewComponent,
  IStoryCategoriesViewComponent,
} from 'viewModels';

import { DiceAreaComponent } from './DiceAreaComponent';
import { IconsAmountSlider } from './IconsAmountSlider';

import { StoryCategoriesSelector } from 'pages/StoryCategoriesSelector';

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
}: Props) => {
  return (
    <Container
      maxWidth="md"
      sx={{ height: 'calc(100vh - 24px - 24px - 24px - 64px)', paddingTop: '32px' }}
    >
      <IconsAmountSlider viewComponent={diceAmountViewComponent} />

      <Box sx={{ marginTop: '32px' }}>
        <StoryCategoriesSelector viewComponent={storyCategoriesViewComponent} />
      </Box>

      <Box
        sx={{
          margin: '32px 0',
        }}
      >
        <DiceAreaComponent viewComponent={diceAreaViewComponent} />
      </Box>
    </Container>
  );
};
