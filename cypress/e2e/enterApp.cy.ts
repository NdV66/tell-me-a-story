const PATH = 'localhost:3000';

describe('On enter app (page)', () => {
  beforeEach(() => {
    cy.visit(PATH);
  });

  it('Should have all elements on enter', () => {
    cy.get('header');
  });
});
