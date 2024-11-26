describe('Token Pair List', () => {
  it('Displays token pairs with correct labels', () => {
    cy.visit('/');
    cy.contains('MATIC/CQT').should('be.visible');
    cy.contains('WBTC/CQT').should('be.visible');
    cy.contains('WETH/CQT').should('be.visible');
  });

  it('Displays prices correctly', () => {
    // Mock WebSocket data
    cy.intercept('GET', '**/websocket-endpoint', {
      body: {
        MATIC_CQT: 1.23,
        WBTC_CQT: 45678.9,
        WETH_CQT: 3123.45,
      },
    }).as('getPrices');

    cy.visit('/');
    cy.wait('@getPrices');

    cy.get('#MATIC_CQT_price').should('contain.text', '$1.23');
    cy.get('#WBTC_CQT_price').should('contain.text', '$45678.9');
    cy.get('#WETH_CQT_price').should('contain.text', '$3123.45');
  });
});
