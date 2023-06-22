import Button from '@mui/material/Button';
import { TTranslations } from 'types';

type Props = {
  onClick: () => void;
  translations: TTranslations;
};

export const TellButton = ({ onClick, translations }: Props) => (
  <Button variant="contained" onClick={onClick}>
    {translations.roll}
  </Button>
);
