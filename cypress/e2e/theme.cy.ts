/// <reference types="cypress" />
import hexRgb from 'hex-rgb';
import { DARK_THEME, LIGHT_THEME } from '../../src/data/themes';
import { TAppTheme, ECookieKeys } from '../../src/types';
import { SELECTORS } from './selectors';

const hexToRgb = (hex: string) => {
  const { red, green, blue } = hexRgb(hex);
  return `rgb(${red}, ${green}, ${blue})`;
};

const checkTheme = (theme: TAppTheme) => {
  cy.getCookie(ECookieKeys.THEME).should('exist');
  cy.getCookie(ECookieKeys.THEME).should('have.property', 'value', theme.name);

  cy.get(SELECTORS.ICON).should('have.css', 'color', hexToRgb(theme.primary));
  cy.get(SELECTORS.APP_BAR).should('have.css', 'background-color', hexToRgb(theme.primary));
  cy.get(SELECTORS.BODY).should('have.css', 'background-color', hexToRgb(theme.background));
};

describe('App theme (dark and light)', () => {
  it('Should change theme from default (dark) to light', () => {
    checkTheme(DARK_THEME);
    cy.get(SELECTORS.SWITCH).click();
    checkTheme(LIGHT_THEME);
  });
});
