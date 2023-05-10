describe("Login", ()=> {
    beforeEach(() =>{
        cy.visit("http://localhost:3000/")
    })
    it('If login is correct should navigate to dashboard', () => {
        cy.get('[data-testid="login__form"]')
        cy.get('[data-testid="login__email__input"]').type("admin@admin.com");
        cy.get('[data-testid="login__password__input"]').type("admin");
        cy.get('[data-testid="login__submit__button"]').click();
        cy.location('pathname').should('not.include', 'login')
        cy.get('[data-testid="dashboard__kpi"]')
    })
    it('If login is incorrect should stay at login', () => {
        cy.get('[data-testid="login__email__input"]').type("failUser@fail.com");
        cy.get('[data-testid="login__password__input"]').type("fail");
        cy.get('[data-testid="login__submit__button"]').click();
        cy.location('pathname').should('include', 'login')
        cy.get('[data-testid="login__form"]')
    })
})