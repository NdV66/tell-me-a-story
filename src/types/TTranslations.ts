import { EStoryCategory } from './EStoryCategory';

export type TTranslations = {
  lang: string;
  appName: string;
  themeChange: string;
  roll: string;
  noRoll: string;
  reroll: string;

  settingsDice: string;
  settingCategories: string;

  repo: string;
  repoLink: string;
  github: string;
  githubLink: string;
  author: string;
  lnLink: string;

  categoriesByKeys: {
    [key in EStoryCategory]: string;
  };
};
