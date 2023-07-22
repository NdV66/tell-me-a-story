import { TAppTheme } from 'types';

const COMMON = {
  fontSize: 14,
  light: '#dedbe9',
};

export const LIGHT_THEME: TAppTheme = {
  ...COMMON,
  name: 'light',
  primary: '#5B4F93',
  secondary: '#A37ED9',
  background: '#dedbe9',
};

export const DARK_THEME: TAppTheme = {
  ...COMMON,
  name: 'dark',
  primary: '#545983',
  secondary: '#1D267D',
  background: '#04071f',
};
