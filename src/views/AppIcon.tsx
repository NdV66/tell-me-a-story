import { styled } from '@mui/material/styles';

type Props = {
  icon: string;
};

const StyledAppIcon = styled('div')(({ theme }) => ({}));

export const AppIcon = ({ icon }: Props) => {
  const classNames = `ra ra-${icon} ra-fw`;

  return <StyledAppIcon className={classNames} />;
};
