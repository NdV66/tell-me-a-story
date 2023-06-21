type Props = {
  icon: string;
};

export const AppIcon = ({ icon }: Props) => {
  const classNames = `ra ra-${icon} ra-fw`;

  return <i className={classNames}></i>;
};
