import { SettingsArea, useSettingsContext } from 'views';
import { IDiceAreaViewComponent, IHomePageViewModel } from 'viewModels';
import { useStateObservable } from 'tools';
import { Box, Container } from '@mui/material';
import { useEffect } from 'react';
import { DiceAreaComponent } from './DiceAreaComponent';

type Props = {
  viewModel: IHomePageViewModel;
  diceAreaViewComponent: IDiceAreaViewComponent;
};

const useHomePage = (viewModel: IHomePageViewModel) => {
  const { translations } = useSettingsContext();
  const diceAmount = useStateObservable(viewModel.currentDiceAmount$);
  const currentCategories = useStateObservable(viewModel.currentCategories$);
  const maxDiceAmount = useStateObservable(viewModel.maxDiceAmount$);

  //   useEffect(() => {
  //     viewModel.tellAStory(
  //       viewModel.diceSettings.defaultCategoriesKeys,
  //       viewModel.diceSettings.defaultDiceAmount,
  //     );
  //   }, [viewModel]);

  return {
    translations,
    diceAmount,
    currentCategories,
    maxDiceAmount,

    diceSettings: viewModel.diceSettings,
    changeDiceAmount: viewModel.changeDiceAmount,
    changeCategories: viewModel.changeCategories,
  };
};

export const HomePage = ({ viewModel, diceAreaViewComponent }: Props) => {
  const {
    translations,
    diceAmount,
    changeDiceAmount,
    diceSettings,
    changeCategories,
    currentCategories,
    maxDiceAmount,
  } = useHomePage(viewModel);

  const isLoading = !diceAmount || !currentCategories || !maxDiceAmount;

  //TODO loader
  return !isLoading ? (
    <Container
      maxWidth="md"
      sx={{ height: 'calc(100vh - 24px - 24px - 24px - 64px)', paddingTop: '32px' }}
    >
      <SettingsArea
        categories={diceSettings.categoriesKeys}
        translations={translations}
        min={diceSettings.minDice}
        max={maxDiceAmount}
        step={diceSettings.stepDice}
        value={diceAmount}
        onChange={changeDiceAmount}
        onChangeCategories={changeCategories}
        currentCategories={currentCategories}
      />

      <Box
        sx={{
          margin: '32px 0',
        }}
      >
        <DiceAreaComponent viewComponent={diceAreaViewComponent} />
      </Box>
    </Container>
  ) : null;
};
