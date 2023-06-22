import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Button from '@mui/material/Button';
import { DiceArea, useSettingsContext } from 'views';
import { IHomePageViewModel } from 'viewModels';
import { useStateObservable } from 'tools';
import { EStoryCategory } from 'types';

type Props = {
  viewModel: IHomePageViewModel;
};

const useHomePage = (viewModel: IHomePageViewModel) => {
  const { translations } = useSettingsContext();
  const dice = useStateObservable(viewModel.currentDice$);

  return {
    dice,
    tellAStory: viewModel.tellAStory,
    translations,
  };
};

export const HomePage = ({ viewModel }: Props) => {
  const { dice, tellAStory, translations } = useHomePage(viewModel);

  return (
    <Grid container spacing={2}>
      <Grid lg={12}>
        <Button variant="contained" onClick={() => tellAStory(EStoryCategory.PLAYER, 4)}>
          {translations.roll}
        </Button>
      </Grid>

      <Grid>
        <DiceArea dice={dice || []} />
      </Grid>
    </Grid>
  );
};
