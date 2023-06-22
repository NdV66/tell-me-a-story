import { styled } from '@mui/material/styles';
import { EAppTheme } from 'types';

type Props = {
  icon: string;
};

const StyledAppIcon = styled('i')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  fontSize: '96px',
  paddingTop: '64px',
  color: theme.palette.primary.main,
}));

export const AppIcon = ({ icon }: Props) => {
  const classNames = `ra ra-${icon} ra-fw`;

  return <StyledAppIcon className={classNames} />;
};
