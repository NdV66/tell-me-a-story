import { DiceArea, SettingsArea, useSettingsContext } from 'views';
import { IHomePageViewModel } from 'viewModels';
import { useStateObservable } from 'tools';
import { Box, Container, styled } from '@mui/material';
import { useEffect } from 'react';

type Props = {
  viewModel: IHomePageViewModel;
};

const useHomePage = (viewModel: IHomePageViewModel) => {
  const { translations } = useSettingsContext();
  const currentDice = useStateObservable(viewModel.currentDice$);
  const diceAmount = useStateObservable(viewModel.currentDiceAmount$);
  const currentCategories = useStateObservable(viewModel.currentCategories$);
  const maxDiceAmount = useStateObservable(viewModel.maxDiceAmount$);

  useEffect(() => {
    viewModel.tellAStory(
      viewModel.diceSettings.defaultCategoriesKeys,
      viewModel.diceSettings.defaultDiceAmount,
    );
  }, [viewModel]);

  return {
    currentDice,
    translations,
    diceAmount,
    currentCategories,
    maxDiceAmount,

    diceSettings: viewModel.diceSettings,
    changeDiceAmount: viewModel.changeDiceAmount,
    changeCategories: viewModel.changeCategories,
  };
};

const StyledContainer = styled(Container)(() => ({
  paddingTop: '32px',
}));

export const HomePage = ({ viewModel }: Props) => {
  const {
    currentDice,
    translations,
    diceAmount,
    changeDiceAmount,
    diceSettings,
    changeCategories,
    currentCategories,
    maxDiceAmount,
  } = useHomePage(viewModel);

  const isLoading = !diceAmount || !currentCategories || !maxDiceAmount;

  return !isLoading ? (
    <StyledContainer maxWidth="md" sx={{ height: 'calc(100vh - 24px - 24px - 24px - 64px)' }}>
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
        {currentDice && <DiceArea dice={currentDice} />}
      </Box>
    </StyledContainer>
  ) : null; //TODO loader
};
