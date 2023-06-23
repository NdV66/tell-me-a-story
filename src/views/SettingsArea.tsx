import { TTranslations } from 'types';
import { IconsAmountSlider } from './IconsAmountSlider';

type Props = {
  translations: TTranslations;
};

export const SettingsArea = ({ translations }: Props) => {
  return (
    <div>
      <IconsAmountSlider translations={translations} />
    </div>
  );
};
