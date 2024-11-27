describe("Bot Configuration Tests", () => {
  it("Validates required fields", () => {
    cy.visit("/bot-configuration");
    cy.contains("Start Bot").click();
    cy.contains("Trading Strategy is required").should("be.visible");
  });

  it("Submits bot configuration successfully", () => {
    cy.visit("/bot-configuration");
    cy.get('select[name="
