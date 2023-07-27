export const SELECTORS = {
  HEADER: 'header',
  MAIN: 'main',
  FOOTER: 'footer',
  BODY: 'body',

  MARK: '.MuiSlider-markLabel',
  CHIP: '.MuiChip-label',
  ICON: '.ra',
  SWITCH: '.MuiSwitch-root',
  SELECT: '.MuiSelect-select',
  BACKDROP: '.MuiBackdrop-root',
  APP_BAR: '.MuiAppBar-root',

  VALUE: (value: string | number) => `[data-value="${value}"]`,
};
