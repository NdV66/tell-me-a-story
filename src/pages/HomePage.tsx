import { Box, Container } from '@mui/material';
import { useSettingsContext } from 'views';
import { IDiceAreaViewComponent, IHomePageViewModel } from 'viewModels';
import { useStateObservable } from 'tools';
import { DiceAreaComponent } from './DiceAreaComponent';
import { IconsAmountSlider } from './IconsAmountSlider';
import { IDiceAmountViewComponent } from 'viewModels/DiceAmountViewComponent';
import { StoryCategorySelector } from 'views/StoryCategorySelector';

type Props = {
  viewModel: IHomePageViewModel;
  diceAreaViewComponent: IDiceAreaViewComponent;
  diceAmountViewComponent: IDiceAmountViewComponent;
};

const useHomePage = (viewModel: IHomePageViewModel) => {
  const { translations } = useSettingsContext();
  const currentCategories = useStateObservable(viewModel.currentCategories$);

  return {
    translations,
    currentCategories,
    diceSettings: viewModel.diceSettings,
    changeCategories: viewModel.changeCategories,
  };
};

export const HomePage = ({ viewModel, diceAreaViewComponent, diceAmountViewComponent }: Props) => {
  const { translations, changeCategories, currentCategories, diceSettings } =
    useHomePage(viewModel);

  const isLoading = !currentCategories;

  //TODO loader
  return !isLoading ? (
    <Container
      maxWidth="md"
      sx={{ height: 'calc(100vh - 24px - 24px - 24px - 64px)', paddingTop: '32px' }}
    >
      <IconsAmountSlider viewComponent={diceAmountViewComponent} />

      <Box sx={{ marginTop: '32px' }}>
        <StoryCategorySelector
          translations={translations}
          categories={diceSettings.categoriesKeys}
          onChange={changeCategories}
          values={currentCategories}
        />
      </Box>

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
