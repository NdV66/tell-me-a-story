import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { IDiceAreaViewComponent } from 'viewModels';
import { useStateObservable } from 'tools';
import { AppIcon } from './AppIcon';
import { TEST_IDS } from 'data';

type Props = {
  viewComponent: IDiceAreaViewComponent;
};

export const useDiceAreaComponent = (viewComponent: IDiceAreaViewComponent) => {
  const currentDice = useStateObservable(viewComponent.currentDice$);

  return {
    currentDice,
  };
};

export const DiceAreaComponent = ({ viewComponent }: Props) => {
  const { currentDice } = useDiceAreaComponent(viewComponent);

  return currentDice ? (
    <Grid2 container justifyContent="flex-start" data-testid={TEST_IDS.DiceAreaComponent}>
      {currentDice.map((icon) => (
        <Grid2 key={icon} xs={4} role="grid">
          <AppIcon icon={icon} />
        </Grid2>
      ))}
    </Grid2>
  ) : null;
};
