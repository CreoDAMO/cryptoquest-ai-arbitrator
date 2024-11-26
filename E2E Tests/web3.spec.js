describe('Web3 Mock Tests', () => {
  before(() => {
    // Stub Web3 data calls
    cy.stub(ethers.Contract.prototype, 'totalStaked').resolves(ethers.utils.parseEther('1000'));
    cy.stub(ethers.Contract.prototype, 'getAPY').resolves(12.5);
  });

  it('Displays staking data correctly', () => {
    cy.visit('/ecosystem');
    cy.get('#totalStaked').should('contain.text', '1000');
    cy.get('#apy').should('contain.text', '12.5%');
  });
});
