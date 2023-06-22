import { Box } from '@mui/material';
import { AppIcon } from './AppIcon';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

type Props = {
  dice: Array<string>;
};

export const DiceArea = ({ dice }: Props) => (
  <Box>
    <Grid2 container justifyContent="center">
      {dice.map((icon) => (
        <Grid2 key={icon} xs={4}>
          <AppIcon icon={icon} />
        </Grid2>
      ))}
    </Grid2>
  </Box>
);
