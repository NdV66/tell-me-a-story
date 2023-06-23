import { Link } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

type Props = {
  title: string;
  link: string;
};

export const OneFooterColumn = ({ title, link }: Props) => (
  <Grid2 lg={4} justifyContent="center" display="flex">
    <Link href={link} underline="none" target="_blank" rel="noopener noreferrer">
      {title}
    </Link>
  </Grid2>
);
