/// <reference types="cypress" />
import { ENV } from '../../src/appEnv';
import { TRANSLATIONS_EN } from '../../src/data/lang';
import { ECookieKeys } from '../../src/types';

describe('Default settings and configurations when enter page', () => {
  it('Should have all text elements on enter', () => {
    cy.get('header').contains(TRANSLATIONS_EN.appName);
    cy.get('header').contains(TRANSLATIONS_EN.lang);

    cy.get('main').contains(TRANSLATIONS_EN.settingsDice);
    cy.get('main').contains(TRANSLATIONS_EN.settingCategories);
    cy.get('main').contains(TRANSLATIONS_EN.reroll);

    cy.get('footer').get('a').contains(TRANSLATIONS_EN.repo);
    cy.get('footer').get('a').contains(TRANSLATIONS_EN.github);
    cy.get('footer').get('a').contains(TRANSLATIONS_EN.author);
  });

  it('Should have default cookies on enter', () => {
    cy.getCookie(ECookieKeys.LANG).should('exist');
    cy.getCookie(ECookieKeys.LANG).should('have.property', 'value', ENV.lang);

    cy.getCookie(ECookieKeys.THEME).should('exist');
    cy.getCookie(ECookieKeys.THEME).should('have.property', 'value', ENV.theme);
  });

  it('Should have default story settings on enter', () => {
    const iconsAMount = 12;
    cy.get('.ra').should('have.length', iconsAMount);

    //check if thumb is long enough to touch default icons amount on the selector
    cy.get('.MuiSlider-thumb').should('have.attr', { style: '75%' });

    for (let key of ENV.diceSettings.defaultCategoriesKeys) {
      cy.get('.MuiChip-label').contains(TRANSLATIONS_EN.categoriesByKeys[key]);
    }
  });
});
