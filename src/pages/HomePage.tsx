import { DiceArea, SettingsArea, TellButton, useSettingsContext } from 'views';
import { IHomePageViewModel } from 'viewModels';
import { useStateObservable } from 'tools';
import { EStoryCategory } from 'types';
import { Box, Container, styled } from '@mui/material';
import { useEffect } from 'react';

type Props = {
  viewModel: IHomePageViewModel;
};

const useHomePage = (viewModel: IHomePageViewModel) => {
  const { translations } = useSettingsContext();
  const dice = useStateObservable(viewModel.currentDice$);
  const diceAmount = useStateObservable(viewModel.currentDiceAmount$);
  const currentCategories = useStateObservable(viewModel.currentCategories$);

  useEffect(() => {
    viewModel.tellAStory(EStoryCategory.PLAYER, viewModel.diceSettings.defaultDiceAmount);
  }, [viewModel]);

  return {
    dice,
    translations,
    diceAmount,
    currentCategories,

    diceSettings: viewModel.diceSettings,
    tellAStory: viewModel.tellAStory,
    changeDiceAmount: viewModel.changeDiceAmount,
    changeCategories: viewModel.changeCategories,
  };
};

const StyledContainer = styled(Container)(() => ({
  paddingTop: '32px',
}));

export const HomePage = ({ viewModel }: Props) => {
  const {
    dice,
    tellAStory,
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
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '64px',
          marginTop: '64px',
        }}
      >
        <TellButton
          onClick={() => tellAStory(EStoryCategory.PLAYER, diceAmount)}
          translations={translations}
        />
      </Box>
      {dice && <DiceArea dice={dice} />}
    </StyledContainer>
  ) : null; //TODO loader
};
