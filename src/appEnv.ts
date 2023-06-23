import { DARK_THEME, LIGHT_THEME, TRANSLATIONS_EN, TRANSLATIONS_PL } from 'data';
import { EAppLangs, EAppTheme, TDiceSettings } from 'types';

const diceSettings: TDiceSettings = {
  defaultDiceAmount: 9,
  minDice: 3,
  maxDice: 12,
  stepDice: 3,
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
