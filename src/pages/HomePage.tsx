import { DiceArea, TellButton, useSettingsContext } from 'views';
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

  return {
    dice,
    tellAStory: viewModel.tellAStory,
    translations,
  };
};

const StyledContainer = styled(Container)(() => ({
  paddingTop: '32px',
}));

export const HomePage = ({ viewModel }: Props) => {
  const { dice, tellAStory, translations } = useHomePage(viewModel);

  return (
    <StyledContainer maxWidth="lg" sx={{ height: 'calc(100vh - 24px - 24px - 24px - 64px)' }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '64px',
        }}
      >
        <TellButton
          onClick={() => tellAStory(EStoryCategory.PLAYER, 4)}
          translations={translations}
        />
      </Box>

      {dice ? <DiceArea dice={dice} /> : <DiceArea.Empty translations={translations} />}
    </StyledContainer>
  );
};
