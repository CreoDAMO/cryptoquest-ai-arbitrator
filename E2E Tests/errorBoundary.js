describe('Error Boundary Tests', () => {
  it('Displays fallback UI on component error', () => {
    cy.visit('/error-boundary-test'); // Simulate error boundary trigger
    cy.contains('Something went wrong').should('be.visible');
    cy.contains('Retry').click();
    cy.contains('CryptoQuest AI Arbitrator').should('be.visible');
  });
});
