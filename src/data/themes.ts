import { TAppTheme } from 'types';

const COMMON = {
  fontSize: 14,
};

export const LIGHT_THEME: TAppTheme = {
  ...COMMON,
  name: 'light',
  primary: '#5B4F93',
  secondary: '#A37ED9',
  success: '#91ACC7',
  accent: '#DFCEE5',
  background: '#dedbe9',
};

export const DARK_THEME: TAppTheme = {
  ...COMMON,
  name: 'dark',
  primary: '#545983',
  secondary: '#1D267D',
  success: '#5C469C',
  accent: '#D4ADFC',
  background: '#04071f',
};
