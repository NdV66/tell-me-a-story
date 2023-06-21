import { Box } from '@mui/material';
import { AppIcon } from './AppIcon';

type Props = {
  dice: Array<string>;
};

export const DiceArea = ({ dice }: Props) => (
  <Box>
    <div>
      {dice.map((icon) => (
        <AppIcon icon={icon} key={icon} />
      ))}
    </div>
  </Box>
);
