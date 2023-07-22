import { styled } from '@mui/material/styles';

type Props = {
  icon: string;
  role?: string;
};

const StyledAppIcon = styled('i')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  fontSize: theme.typography.fontSize * 5.8,
  paddingTop: '40px',
  color: theme.palette.primary.main,
}));

export const AppIcon = ({ icon, role = 'gridcell' }: Props) => {
  const classNames = `ra ra-${icon} ra-fw`;

  return <StyledAppIcon className={classNames} role={role} />;
};
