/// <reference types="cypress" />
import { ENV } from '../../src/appEnv';
import { TRANSLATIONS_EN } from '../../src/data/lang';
import { EStoryCategory } from '../../src/types';
import { SELECTORS } from './selectors';

const closeCategoriesSelectList = () => {
  cy.get(SELECTORS.BACKDROP).should('have.css', 'opacity', '1');
  cy.get(SELECTORS.BODY).click();
  cy.get(SELECTORS.BACKDROP).should('have.css', 'opacity', '0');
};

const openCategoriesSelectList = () => {
  cy.get(SELECTORS.CHIP).should('have.length', 1);
  cy.get(SELECTORS.SELECT).eq(1).click();
};

const expectedMaxIcons = 18;

describe('Story settings - categories', () => {
  beforeEach(() => {
    openCategoriesSelectList();
  });

  it('Should add categories', () => {
    cy.get(SELECTORS.MARK).should('have.length', 5);

    cy.get(SELECTORS.VALUE(EStoryCategory.CREATURES)).click();
    cy.get(SELECTORS.VALUE(EStoryCategory.MAGIC)).click();

    closeCategoriesSelectList();

    cy.get(SELECTORS.CHIP).should('have.length', 3);
    cy.get(SELECTORS.MARK).should('have.length', 6);
    cy.get(SELECTORS.MARK).last().contains(expectedMaxIcons);
    cy.get(SELECTORS.ICON).should('have.length', 12);
  });

  it('Should change categories', () => {
    const expectedCategory = EStoryCategory.MAGIC;
    cy.get(SELECTORS.VALUE(expectedCategory)).click();
    cy.get(SELECTORS.VALUE(ENV.diceSettings.defaultCategoriesKeys[0])).click();

    closeCategoriesSelectList();

    cy.get(SELECTORS.CHIP).should('have.length', 1);
    cy.get(SELECTORS.CHIP).contains(TRANSLATIONS_EN.categoriesByKeys[expectedCategory]);
    cy.get(SELECTORS.MARK).last().contains(expectedMaxIcons);
    cy.get(SELECTORS.ICON).should('have.length', 12);
  });

  it("Should not remove category, if it's the last one", () => {
    const expectedLengthOnEnter = ENV.diceSettings.defaultCategoriesKeys.length;

    cy.get(SELECTORS.VALUE(EStoryCategory.PLAYER)).click();
    cy.get(SELECTORS.CHIP).should('have.length', expectedLengthOnEnter);

    for (let key of ENV.diceSettings.defaultCategoriesKeys) {
      cy.get(SELECTORS.VALUE(key)).click();
    }

    closeCategoriesSelectList();
    cy.get(SELECTORS.CHIP).should('have.length', 1);
  });
});

describe('Story settings - dice amount', () => {
  it('Should change dice amount when dice amount mark is changed', () => {
    const marksAmount = 5;

    for (let i = 0; i < marksAmount; i++) {
      const iconsAmount = (i + 1) * ENV.diceSettings.stepDice;
      cy.get(`.MuiSlider-markLabel[data-index="${i}"]`).click();
      cy.get(SELECTORS.ICON).should('have.length', iconsAmount);
    }
  });
});
