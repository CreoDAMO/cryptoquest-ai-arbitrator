describe("Web3 Integration", () => {
  it("Detects chain mismatch", () => {
    cy.stub(window.ethereum, "request").resolves("wrong-chain");
    cy.visit("/');
    cy.contains("Please switch to the correct network").should("be.visible");
  });
});
