import { DARK_THEME, LIGHT_THEME, TRANSLATIONS_EN, TRANSLATIONS_PL } from 'data';
import { EAppLangs, EAppTheme, EStoryCategory, TDiceSettings } from 'types';

const diceSettings: TDiceSettings = {
  minDice: 3,
  stepDice: 3,
  maxThresholds: 5,
  categoriesKeys: Object.values(EStoryCategory),
  defaultCategoriesKeys: [EStoryCategory.PLAYER],
};

export const ENV = {
  lang: EAppLangs.EN,
  theme: EAppTheme.DARK,

  diceSettings,

  mappedTranslations: new Map([
    [EAppLangs.EN, TRANSLATIONS_EN],
    [EAppLangs.PL, TRANSLATIONS_PL],
  ]),
  mappedThemes: new Map([
    [EAppTheme.DARK, DARK_THEME],
    [EAppTheme.LIGHT, LIGHT_THEME],
  ]),
};
