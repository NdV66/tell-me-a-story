import { EStoryCategory } from './EStoryCategory';

export type TDiceSettings = {
  defaultDiceAmount: number;
  minDice: number;
  maxDice: number;
  stepDice: number;

  categoriesKeys: Array<string>;
  defaultCategoriesKeys: Array<EStoryCategory>;
};
