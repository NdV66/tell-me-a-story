import { Box, Container } from '@mui/material';
import {
  IDiceAreaViewComponent,
  IHomePageViewModel,
  IDiceAmountViewComponent,
  IStoryCategoriesViewComponent,
} from 'viewModels';

import { DiceAreaComponent } from './DiceAreaComponent';
import { StorySettingsComponent } from './StorySettingsComponent';

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
}: Props) => {
  return (
    <Container
      maxWidth="md"
      sx={{ minHeight: 'calc(100vh - 24px - 24px - 24px - 105px)', paddingTop: '32px' }}
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
};
