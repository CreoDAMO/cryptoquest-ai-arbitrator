describe('TradingFlowVisualization Component', () => {
  it('Renders trades correctly', () => {
    const mockTrades = [
      { source: { position: [0, 0, 0] }, destination: { position: [1, 1, 1] }, volume: 100 },
      { source: { position: [2, 2, 2] }, destination: { position: [3, 3, 3] }, volume: 50 },
    ];

    cy.mount(<TradingFlowVisualization trades={mockTrades} />);
    cy.get('canvas').should('exist');
  });
});
