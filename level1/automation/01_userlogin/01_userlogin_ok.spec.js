describe("TS1 User Login", () => {
    beforeEach(() => {
        cy.visit('/dashboard/auth/login/');
    })

    afterEach(() => {
        //It is necessary to log out after each test, to log in again with different credentials
        cy.get('[data-testid="nav_header_showUserMenu"]').click();
        cy.contains("Log Out").click();

        //Added a wait time to make sure the user has logged out
        cy.wait(10000);
        cy.url().should('include', 'dashboard/auth/login?logged-out');
        cy.get('[data-testid="login__messages"]').contains('You have been logged out.');
    })       

    it("TC01 Login to Rancher UI sucessfully", () => {
      cy.fixture("login_data.json").then((loginData) => {
        loginData.users_ok.forEach((user) => {
            cy.visit('/dashboard/auth/login/');
            cy.get("#username").type(user.username);
            cy.get("#password").type(user.password, { log: false });
            cy.get('button[type="submit"]').click();
            //Added a wait time to make sure the main page is loaded
            cy.wait(15000);
            cy.location('pathname').should('eq', '/dashboard/home')})
        })
    })
  
});
