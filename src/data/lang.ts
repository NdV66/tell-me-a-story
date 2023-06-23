import { TTranslations } from 'types';

const COMMON = {
  repoLink: '',
  githubLink: 'https://github.com/NdV66',
  lnLink: '',
  author: 'NdV66 (Marta Zażlak), 2023',
};

export const TRANSLATIONS_EN: TTranslations = {
  lang: 'English',
  appName: 'Tell me a story!',
  themeChange: 'theme',
  roll: 'Tell me a story!',
  noRoll: 'A long, long time ago...',

  repo: 'See this repo',
  github: 'See my Github',
  ...COMMON,
};

export const TRANSLATIONS_PL: TTranslations = {
  lang: 'polski',
  appName: 'Opowiedz mi!',
  themeChange: 'tryb',
  roll: 'Opowiedz mi!',
  noRoll: 'Dawno, dawno temu...',

  repo: 'Zobacz to repo',
  github: 'Zerknij na mój Github',
  ...COMMON,
};
