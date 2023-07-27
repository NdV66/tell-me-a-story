/// <reference types="cypress" />
import { ENV } from '../../src/appEnv';
import { TRANSLATIONS_EN } from '../../src/data/lang';
import { ECookieKeys } from '../../src/types';
import { SELECTORS } from './selectors';

describe('Default settings and configurations when enter page', () => {
  it('Should have all text elements on enter', () => {
    cy.get(SELECTORS.HEADER).contains(TRANSLATIONS_EN.appName);
    cy.get(SELECTORS.HEADER).contains(TRANSLATIONS_EN.lang);

    cy.get(SELECTORS.MAIN).contains(TRANSLATIONS_EN.settingsDice);
    cy.get(SELECTORS.MAIN).contains(TRANSLATIONS_EN.settingCategories);
    cy.get(SELECTORS.MAIN).contains(TRANSLATIONS_EN.reroll);

    cy.get(SELECTORS.FOOTER)
      .get('a')
      .contains(TRANSLATIONS_EN.repo)
      .should('have.attr', 'href', TRANSLATIONS_EN.repoLink);
    cy.get(SELECTORS.FOOTER)
      .get('a')
      .contains(TRANSLATIONS_EN.github)
      .should('have.attr', 'href', TRANSLATIONS_EN.githubLink);
    cy.get(SELECTORS.FOOTER)
      .get('a')
      .contains(TRANSLATIONS_EN.author)
      .should('have.attr', 'href', TRANSLATIONS_EN.lnLink);
  });

  it('Should have default cookies on enter', () => {
    cy.getCookie(ECookieKeys.LANG).should('exist');
    cy.getCookie(ECookieKeys.LANG).should('have.property', 'value', ENV.lang);

    cy.getCookie(ECookieKeys.THEME).should('exist');
    cy.getCookie(ECookieKeys.THEME).should('have.property', 'value', ENV.theme);
  });

  it('Should have default story settings on enter', () => {
    const iconsAMount = 12;
    cy.get(SELECTORS.ICON).should('have.length', iconsAMount);

    //check if thumb is long enough to touch default icons amount on the selector
    cy.get('.MuiSlider-thumb').should('have.attr', { style: '75%' });

    for (let key of ENV.diceSettings.defaultCategoriesKeys) {
      cy.get(SELECTORS.CHIP).contains(TRANSLATIONS_EN.categoriesByKeys[key]);
    }
  });
});
