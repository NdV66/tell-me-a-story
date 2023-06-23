import { EStoryCategory } from './EStoryCategory';

export type TDiceSettings = {
  defaultDiceAmount: number;
  minDice: number;
  stepDice: number;

  maxThresholds: number;
  categoriesKeys: Array<string>;
  defaultCategoriesKeys: Array<EStoryCategory>;
};
