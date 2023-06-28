import { Link } from '@mui/material';

type Props = {
  title: string;
  link: string;
};

export const OneFooterColumn = ({ title, link }: Props) => (
  <Link
    href={link}
    underline="none"
    target="_blank"
    rel="noopener noreferrer"
    display="block"
    align="center"
  >
    {title}
  </Link>
);
