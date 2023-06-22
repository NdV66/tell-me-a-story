import { TTranslations } from 'types';
import { AppIcon } from './AppIcon';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Typography, styled } from '@mui/material';

type Props = {
  dice: Array<string>;
};

type EmptyProps = {
  translations: TTranslations;
};

const StyledDiceAreaEmptyTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const DiceArea = ({ dice }: Props) => (
  <Grid2 container justifyContent="center">
    {dice.map((icon) => (
      <Grid2 key={icon} xs={4} justifyContent="center">
        <AppIcon icon={icon} />
      </Grid2>
    ))}
  </Grid2>
);

const DiceAreaEmpty = ({ translations }: EmptyProps) => (
  <StyledDiceAreaEmptyTypography variant="h4" align="center">
    {translations.noRoll}
  </StyledDiceAreaEmptyTypography>
);

DiceArea.Empty = DiceAreaEmpty;
