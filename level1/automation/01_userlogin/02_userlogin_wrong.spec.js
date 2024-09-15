describe("TS1 User Login", () => {
    beforeEach(() => {
        cy.visit('/dashboard/auth/login/');
        //Added a wait time to make sure the main page is loaded
        cy.wait(5000);
    })

    it("Wrong login to Rancher UI", () => {
      cy.fixture("login_data.json").then((loginData) => {
        loginData.users_wrong.forEach((user) => {
            cy.visit('/dashboard/auth/login/');
            cy.get("#username").type(user.username);
            cy.get("#password").type(user.password, { log: false });
            cy.get('button[type="submit"]').click();
            //Added a wait time to make sure the user&pass is checked
            cy.wait(5000);
            //Check error message is shown
            cy.get('[data-testid="login__messages"]').contains('Invalid username or password. Please try again.');
            })
        })
    })
  
});
