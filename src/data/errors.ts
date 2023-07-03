import { TAppErrors } from 'types';

export const APP_ERRORS: TAppErrors = {
  OUT_OF_RANGE: new Error('[Tell Me]: Out of range'),
  WRONG_MIN_DICE: new Error('[Tell Me]: Min dice cannot be less or equal than a stepDice'),
};
