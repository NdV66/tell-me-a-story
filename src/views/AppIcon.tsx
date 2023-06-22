import { styled } from '@mui/material/styles';
import { EAppTheme } from 'types';

type Props = {
  icon: string;
};

const StyledAppIcon = styled('div')(({ theme }) => ({
  fontSize: '96px',
  paddingTop: '32px',
  color:
    theme.palette.mode === EAppTheme.LIGHT ? theme.palette.primary.main : theme.palette.info.main,
}));

export const AppIcon = ({ icon }: Props) => {
  const classNames = `ra ra-${icon} ra-fw`;

  return <StyledAppIcon className={classNames} />;
};
