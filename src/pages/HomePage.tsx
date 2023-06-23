import { DiceArea, SettingsArea, TellButton, useSettingsContext } from 'views';
import { IHomePageViewModel } from 'viewModels';
import { useStateObservable } from 'tools';
import { EStoryCategory } from 'types';
import { Box, Container, styled } from '@mui/material';

type Props = {
  viewModel: IHomePageViewModel;
};

const useHomePage = (viewModel: IHomePageViewModel) => {
  const { translations } = useSettingsContext();
  const dice = useStateObservable(viewModel.currentDice$);
  const diceAmount = useStateObservable(viewModel.currentDiceAmount$);

  return {
    dice,
    translations,
    diceAmount: diceAmount,
    tellAStory: viewModel.tellAStory,
    changeDiceAmount: viewModel.changeDiceAmount,
  };
};

const StyledContainer = styled(Container)(() => ({
  paddingTop: '32px',
}));

export const HomePage = ({ viewModel }: Props) => {
  const { dice, tellAStory, translations, diceAmount, changeDiceAmount } = useHomePage(viewModel);

  return diceAmount ? (
    <StyledContainer maxWidth="md" sx={{ height: 'calc(100vh - 24px - 24px - 24px - 64px)' }}>
      <SettingsArea
        translations={translations}
        min={3}
        max={12}
        step={3}
        value={diceAmount}
        onChange={changeDiceAmount}
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
      {dice ? <DiceArea dice={dice} /> : <DiceArea.Empty translations={translations} />}
    </StyledContainer>
  ) : null; //TODO loader
};
