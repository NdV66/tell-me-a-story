import { EStoryCategory, TTranslations } from 'types';

const COMMON = {
  repoLink: '',
  githubLink: 'https://github.com/NdV66',
  lnLink: '',
  author: 'NdV66 (Marta Zażlak), 2023',
};

export const TRANSLATIONS_EN: TTranslations = {
  ...COMMON,
  lang: 'English',
  appName: 'Tell me a story!',
  themeChange: 'theme',
  roll: 'Tell me a story!',
  noRoll: 'A long, long time ago...',

  settingsDice: 'How many dice do you want?',
  settingCategories: 'Which categories do you want to have?',

  repo: 'See this repo',
  github: 'See my Github',

  categoriesByKeys: {
    [EStoryCategory.PLAYER]: 'players',
    [EStoryCategory.BOTTLES]: 'bottles',
    [EStoryCategory.INVENTORY]: 'inventory',
    [EStoryCategory.CREATURES]: 'creatures',
    [EStoryCategory.DANGERS]: 'dangers',
    [EStoryCategory.MAGIC]: 'magic',
    [EStoryCategory.MILITARY]: 'military',
    [EStoryCategory.FOOD]: 'food',
  },
};

export const TRANSLATIONS_PL: TTranslations = {
  ...COMMON,
  lang: 'polski',
  appName: 'Opowiedz mi!',
  themeChange: 'tryb',
  roll: 'Opowiedz mi coś!',
  noRoll: 'Dawno, dawno temu...',

  settingsDice: 'Ile kostek mam wylosować?',
  settingCategories: 'O czym mam opowiedzieć?',

  repo: 'Zobacz to repo',
  github: 'Zerknij na mój Github',

  categoriesByKeys: {
    [EStoryCategory.PLAYER]: 'gracze',
    [EStoryCategory.BOTTLES]: 'buteleczki',
    [EStoryCategory.INVENTORY]: 'wyposażenie',
    [EStoryCategory.CREATURES]: 'stworzonka',
    [EStoryCategory.DANGERS]: 'zagrożenia',
    [EStoryCategory.MAGIC]: 'magia',
    [EStoryCategory.MILITARY]: 'militarne',
    [EStoryCategory.FOOD]: 'jedzonka',
  },
};
