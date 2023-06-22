import { styled } from '@mui/material';
import Button from '@mui/material/Button';
import { TTranslations } from 'types';

type Props = {
  onClick: () => void;
  translations: TTranslations;
};

const StyledTellButton = styled(Button)(({ theme }) => ({
  marginTop: '32px',
}));

export const TellButton = ({ onClick, translations }: Props) => (
  <StyledTellButton variant="contained" onClick={onClick}>
    {translations.roll}
  </StyledTellButton>
);
