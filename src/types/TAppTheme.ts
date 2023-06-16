import { PaletteOptions } from '@mui/material';

export type TAppTheme = {
  name: PaletteOptions['mode'];
  primary: string;
  secondary: string;
  success: string;
  accent: string;
};
