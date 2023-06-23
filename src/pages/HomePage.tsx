import { DiceArea, SettingsArea, useSettingsContext } from 'views';
import { IHomePageViewModel } from 'viewModels';
import { useStateObservable } from 'tools';
import { Box, Container, styled } from '@mui/material';
import { useEffect } from 'react';
import { EStoryCategory } from 'types';

type Props = {
  viewModel: IHomePageViewModel;
};

const useHomePage = (viewModel: IHomePageViewModel) => {
  const { translations } = useSettingsContext();
  const currentDice = useStateObservable(viewModel.currentDice$);
  const diceAmount = useStateObservable(viewModel.currentDiceAmount$);
  const currentCategories = useStateObservable(viewModel.currentCategories$);

  useEffect(() => {
    viewModel.tellAStory(
      (EStoryCategory as any)[viewModel.diceSettings.defaultCategoriesKeys[0]],
      viewModel.diceSettings.defaultDiceAmount,
    );
  }, [viewModel]);

  return {
    currentDice,
    translations,
    diceAmount,
    currentCategories,

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
  } = useHomePage(viewModel);

  const isLoading = !diceAmount || !currentCategories;

  return !isLoading ? (
    <StyledContainer maxWidth="md" sx={{ height: 'calc(100vh - 24px - 24px - 24px - 64px)' }}>
      <SettingsArea
        categories={diceSettings.categoriesKeys}
        translations={translations}
        min={diceSettings.minDice}
        max={diceSettings.maxDice}
        step={diceSettings.stepDice}
        value={diceAmount}
        onChange={changeDiceAmount}
        onChangeCategories={changeCategories}
        currentCategories={currentCategories}
      />

      <Box
        sx={{
          marginBottom: '64px',
          marginTop: '64px',
        }}
      >
        {currentDice && <DiceArea dice={currentDice} />}
      </Box>
    </StyledContainer>
  ) : null; //TODO loader
};
