import { ENV } from '../../src/appEnv';
import { TRANSLATIONS_EN } from '../../src/data/lang';
import { ECookieKeys } from '../../src/types';

const PATH = 'localhost:3000';

describe('On enter app (page) (default settings)', () => {
  beforeEach(() => {
    cy.visit(PATH);
  });

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

  // it('Should have default story settings on enter', () => {

  // })
});
