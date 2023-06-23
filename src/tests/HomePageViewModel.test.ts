import { HomePageViewModel } from 'viewModels';
import { diceSettingsMock, iconsManagerMock, storyTellerMock } from './mocks';

describe('HomePageViewModel', () => {
  let viewModel: HomePageViewModel;

  beforeEach(() => {
    viewModel = new HomePageViewModel(storyTellerMock, iconsManagerMock, diceSettingsMock);
  });

  describe('areCategoriesTheSame()', () => {
    test('Should detect the same categories', () => {
      // const current ca
      // const result = viewModel['areCategoriesTheSame']()
    });
  });
});
