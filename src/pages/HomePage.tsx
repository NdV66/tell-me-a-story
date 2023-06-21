import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Button from '@mui/material/Button';
import { DiceArea } from 'views';

export const HomePage = () => {
  return (
    <Grid container spacing={2}>
      <Grid lg={6}>
        <Button variant="contained">DO IT!!!</Button>
      </Grid>

      <Grid>
        <DiceArea dice={['sword', 'aware']} />
      </Grid>
    </Grid>
  );
};
