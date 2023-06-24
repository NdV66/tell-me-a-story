import { EStoryCategory } from './EStoryCategory';

export type TDiceSettings = {
  minDice: number;
  stepDice: number;

  maxThresholds: number;
  categoriesKeys: Array<string>;
  defaultCategoriesKeys: Array<EStoryCategory>;
  defaultCategoriesLength: number;
};
