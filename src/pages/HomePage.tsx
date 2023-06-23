import { Box, Container } from '@mui/material';
import {
  IDiceAreaViewComponent,
  IHomePageViewModel,
  IDiceAmountViewComponent,
  IDiceCategoriesViewComponent,
} from 'viewModels';

import { DiceAreaComponent } from './DiceAreaComponent';
import { IconsAmountSlider } from './IconsAmountSlider';

import { StoryCategorySelector } from 'pages/StoryCategorySelector';

type Props = {
  viewModel: IHomePageViewModel;
  diceAreaViewComponent: IDiceAreaViewComponent;
  diceAmountViewComponent: IDiceAmountViewComponent;
  diceCategoriesViewComponent: IDiceCategoriesViewComponent;
};

export const HomePage = ({
  diceAreaViewComponent,
  diceAmountViewComponent,
  diceCategoriesViewComponent,
}: Props) => {
  return (
    <Container
      maxWidth="md"
      sx={{ height: 'calc(100vh - 24px - 24px - 24px - 64px)', paddingTop: '32px' }}
    >
      <IconsAmountSlider viewComponent={diceAmountViewComponent} />

      <Box sx={{ marginTop: '32px' }}>
        <StoryCategorySelector viewComponent={diceCategoriesViewComponent} />
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
