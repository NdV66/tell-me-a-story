import { Slider, Typography, styled } from '@mui/material';
import { useSettingsContext } from 'context';
import { useStateObservable } from 'tools';
import { IDiceAmountViewComponent } from 'viewModels/DiceAmountViewComponent';
import { prepareMarks } from './helper';

const StyledSlider = styled(Slider)(({ theme }) => ({
  '& .MuiSlider-markLabel': {
    color: theme.palette.primary.main,
  },
}));

type Props = {
  viewComponent: IDiceAmountViewComponent;
};

export const useIconsAmountSlider = (viewComponent: IDiceAmountViewComponent) => {
  const { translations } = useSettingsContext();
  const maxDiceAmount = useStateObservable(viewComponent.maxDiceAmount$);
  const currentDiceAmount = useStateObservable(viewComponent.currentDiceAmount$);

  const handleOnChange = (_: React.SyntheticEvent | Event, value: number | number[]) => {
    console.log('>>>>>>>', value);
    viewComponent.changeDiceAmount(value as any);
  };

  return {
    translations,
    handleOnChange,
    maxDiceAmount,
    currentDiceAmount,
    diceSettings: viewComponent.diceSettings,
  };
};

export const IconsAmountSlider = ({ viewComponent }: Props) => {
  const { translations, handleOnChange, diceSettings, maxDiceAmount, currentDiceAmount } =
    useIconsAmountSlider(viewComponent);

  return (
    <>
      <Typography gutterBottom color="primary">
        {translations.settingsDice}
      </Typography>

      {maxDiceAmount && (
        <StyledSlider
          valueLabelDisplay="off"
          step={diceSettings.stepDice}
          marks={prepareMarks(diceSettings.minDice, maxDiceAmount!, diceSettings.stepDice)}
          min={diceSettings.minDice}
          max={maxDiceAmount!}
          value={currentDiceAmount}
          onChange={handleOnChange}
        />
      )}
    </>
  );
};
