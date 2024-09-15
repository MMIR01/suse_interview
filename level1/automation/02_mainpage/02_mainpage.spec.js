describe('Check Rancher UI user main page', () => {
    before(() => {
        cy.visit('/dashboard/auth/login/');
        //Added a wait time to make sure the main page is loaded
        cy.wait(20000);
        cy.visit('/dashboard/auth/login/');
        cy.get("#username").type("admin");
        cy.get("#password").type("openSUSE2024", { log: false });
        cy.get('button[type="submit"]').click();
        //Added a wait time to make sure the main page is loaded
        cy.wait(20000);
    })

    it('Rancher UI main user page is ok', () => {
        //Check the URL
        cy.location('pathname').should('eq', '/dashboard/home');
        //Check the title
        cy.title().should('eq', 'Rancher');
        //Check the page banner
        cy.get('[data-testid="banner-title"]').contains('Welcome to Rancher');
    });
   
});
