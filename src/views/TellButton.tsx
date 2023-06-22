import { styled } from '@mui/material';
import Button from '@mui/material/Button';
import { TTranslations } from 'types';

type Props = {
  onClick: () => void;
  translations: TTranslations;
};

const StyledTellButton = styled(Button)(() => ({
  padding: '8px 32px',
}));

const StyledWrapper = styled('div')(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  marginTop: '64px',
}));

export const TellButton = ({ onClick, translations }: Props) => (
  <StyledWrapper>
    <StyledTellButton variant="contained" onClick={onClick}>
      {translations.roll}
    </StyledTellButton>
  </StyledWrapper>
);
