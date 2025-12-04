describe("Login Flow", () => {
  it("User can visit login page and attempt login", () => {
    cy.visit("https://web-application-project-phi.vercel.app/login");

    cy.get("input[type='email']").type("test@gmail.com");
    cy.get("input[type='password']").type("123456");

    cy.contains("Login").click();

    cy.contains("Books"); // xuất hiện sau khi login thành công
  });
});
