import { ISettingContext, SettingContext } from 'context';
import {
  APP_ERRORS,
  DARK_THEME,
  ICONS_SET,
  PREFIX_ICON,
  TRANSLATIONS_EN,
  TRANSLATIONS_PL,
} from 'data';
import { IAnyArrayManager, IIconsManager, ISettingsModel, IStoryTellerModel } from 'models';
import { Observable } from 'rxjs';
import { EAppLangs, EAppTheme, EStoryCategory, TDiceSettings, TIconsSet } from 'types';
import {
  IDiceAmountViewComponent,
  IDiceAreaViewComponent,
  IHomePageViewModel,
  IStoryCategoriesViewComponent,
} from 'viewModels';

export const anyArrayManagerMock: IAnyArrayManager = {
  shuffle: jest.fn(),
};

export const prefixIconMock = 'mock-';
export const iconsMock = [
  'mock-icon',
  'other-mock-icon',
  'other-other-mock-icon',
  'other-other-other-mock-icon',
  'other-other-other-other-mock-icon',
];

export const iconsSetMock: TIconsSet = ICONS_SET;

export const iconsManagerMock: IIconsManager = {
  getIconsSetPerCategory: jest.fn(),
  iconPrefix: PREFIX_ICON,
  getCategoriesAmount: jest.fn(),
};

export const diceSettingsMock: TDiceSettings = {
  minDice: 3,
  stepDice: 3,
  maxThresholds: 5,
  categoriesKeys: Object.values(EStoryCategory),
  defaultCategoriesKeys: [EStoryCategory.PLAYER],
  defaultCategoriesLength: iconsSetMock.player.length,
};

export const storyTellerMock: IStoryTellerModel = {
  tellAStory: jest.fn(),
};

export const errorsMock = APP_ERRORS;

export const settingsModelMock: ISettingsModel = {
  appTheme: EAppTheme.DARK,
  theme: DARK_THEME,
  lang: EAppLangs.PL,
  translations: TRANSLATIONS_PL,
  getTranslationsByLang: jest.fn(),
};

export const getSettingsModelMock = () => ({ ...settingsModelMock });

export const diceAreaViewComponentMock: IDiceAreaViewComponent = {
  currentDice$: new Observable(),
  tellAStory: jest.fn(),
};

export const diceAmountViewComponentMock: IDiceAmountViewComponent = {
  changeDiceAmount: jest.fn(),
  changeMaxDiceAmount: jest.fn(),
  diceSettings: diceSettingsMock,
  currentDiceAmount$: new Observable(),
  maxDiceAmount$: new Observable(),
};
export const storyCategoriesViewComponentMock: IStoryCategoriesViewComponent = {
  changeCategories: jest.fn(),
  currentCategories$: new Observable(),
  currentCategoriesLength$: new Observable(),
  diceSettings: diceSettingsMock,
};

export const homePageViewModelMock: IHomePageViewModel = {
  tellAStoryOnceAgain: jest.fn(),
};

export const settingsContextValueMock: ISettingContext = {
  theme: DARK_THEME,
  translations: TRANSLATIONS_EN,
  appLang: EAppLangs.EN,
  appTheme: EAppTheme.DARK,
  isDefaultAppTheme: true,
  availableTranslations: [
    { key: EAppLangs.EN, value: TRANSLATIONS_EN.lang },
    { key: EAppLangs.PL, value: TRANSLATIONS_PL.lang },
  ],

  changeLang: jest.fn(),
  changeAppTheme: jest.fn(),
};

export const wrapper = ({ children }: any) => (
  <SettingContext.Provider value={settingsContextValueMock}>{children}</SettingContext.Provider>
);
