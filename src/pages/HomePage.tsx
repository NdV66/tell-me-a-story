import { Box, Container } from '@mui/material';
import {
  IDiceAreaViewComponent,
  IHomePageViewModel,
  IDiceAmountViewComponent,
  IStoryCategoriesViewComponent,
} from 'viewModels';

import { DiceAreaComponent } from './DiceAreaComponent';
import { StorySettingsComponent } from './StorySettingsComponent';
import { TEST_IDS } from 'data';

type Props = {
  viewModel: IHomePageViewModel;
  diceAreaViewComponent: IDiceAreaViewComponent;
  diceAmountViewComponent: IDiceAmountViewComponent;
  storyCategoriesViewComponent: IStoryCategoriesViewComponent;
};

export const HomePage = ({
  viewModel,
  diceAreaViewComponent,
  diceAmountViewComponent,
  storyCategoriesViewComponent,
}: Props) => (
  <Container
    maxWidth="md"
    sx={{ minHeight: 'calc(100vh - 24px - 24px - 24px - 105px)', paddingTop: '32px' }}
    data-testid={TEST_IDS.HomePage}
  >
    <StorySettingsComponent
      onClickReroll={viewModel.tellAStoryOnceAgain}
      storyCategoriesViewComponent={storyCategoriesViewComponent}
      diceAmountViewComponent={diceAmountViewComponent}
    />

    <Box sx={{ marginBottom: '48px', marginTop: '32px' }}>
      <DiceAreaComponent viewComponent={diceAreaViewComponent} />
    </Box>
  </Container>
);
