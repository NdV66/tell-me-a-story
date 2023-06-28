import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { IDiceAreaViewComponent } from 'viewModels';
import { AppIcon } from 'views';
import { useStateObservable } from 'tools';

type Props = {
  viewComponent: IDiceAreaViewComponent;
};

const useDiceAreaComponent = (viewComponent: IDiceAreaViewComponent) => {
  const currentDice = useStateObservable(viewComponent.currentDice$);

  return {
    currentDice,
  };
};

export const DiceAreaComponent = ({ viewComponent }: Props) => {
  const { currentDice } = useDiceAreaComponent(viewComponent);

  return currentDice ? (
    <Grid2 container justifyContent="flex-start">
      {currentDice.map((icon) => (
        <Grid2 key={icon} xs={4}>
          <AppIcon icon={icon} />
        </Grid2>
      ))}
    </Grid2>
  ) : null;
};
