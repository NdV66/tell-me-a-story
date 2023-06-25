import { styled } from '@mui/material/styles';

type Props = {
  icon: string;
};

const StyledAppIcon = styled('i')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  fontSize: theme.typography.fontSize * 6,
  paddingTop: '48px',
  color: theme.palette.primary.main,
}));

export const AppIcon = ({ icon }: Props) => {
  const classNames = `ra ra-${icon} ra-fw`;

  return <StyledAppIcon className={classNames} />;
};
