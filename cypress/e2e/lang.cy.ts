/// <reference types="cypress" />

import { TRANSLATIONS_EN, TRANSLATIONS_PL } from '../../src/data/lang';
import { EAppLangs } from '../../src/types';
import { SELECTORS } from './selectors';

describe('App lang', () => {
  it('Should change theme from default (English) to Polish', () => {
    cy.get(SELECTORS.HEADER).contains(TRANSLATIONS_EN.appName);
    cy.get(SELECTORS.HEADER).contains(TRANSLATIONS_EN.lang);

    cy.get(SELECTORS.SELECT).eq(0).click();
    cy.get(SELECTORS.VALUE(EAppLangs.PL)).click();

    cy.get(SELECTORS.HEADER).contains(TRANSLATIONS_PL.lang);
    cy.get(SELECTORS.HEADER).contains(TRANSLATIONS_PL.appName);
  });
});
