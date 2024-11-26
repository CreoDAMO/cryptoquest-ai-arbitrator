describe('CryptoQuest AI Arbitrator', () => {
  it('Loads the homepage', () => {
    cy.visit('/');
    cy.contains('CryptoQuest AI Arbitrator').should('be.visible');
  });

  it('Toggles the theme', () => {
    cy.get('#themeToggle').click();
    cy.get('body').should('have.class', 'light-theme');
    cy.get('#themeToggle').click();
    cy.get('body').should('not.have.class', 'light-theme');
  });
});
