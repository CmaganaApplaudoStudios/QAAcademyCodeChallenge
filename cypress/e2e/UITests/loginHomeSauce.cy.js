import homeSaucePage from "../../pages/saucePage/homeSaucePage";
import inventorySaucePage from "../../pages/saucePage/inventorySaucePage";

describe("Login Suite", () => {

    //Redirect us to the saucedemo.com page before every test run
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com')
        cy.wait(1000)

    })

    //This method makes the login with the standard user credentials
    it('Login with Standard user', () => {
        //types the credentials into the login form and click on login button
        homeSaucePage.loginStandardUser()
        //Checks that the span Products is visible
        inventorySaucePage.elements.titleSpan().should('have.text', 'Products')
        //Checks that there are products
        inventorySaucePage.elements.itemNameDiv().should("be.visible")
    });
    //This method makes the login with the locked_out_user credentials
    it('Login with locked out user', () => {
        //types the credentials into the login form and click on login button
        homeSaucePage.loginLockedOutUser()
    })
    //This method makes the login with the problem_user credentials
    it('Login problem_user', () => {
        //types the credentials into the login form and click on login button
        homeSaucePage.loginProblemUser()
        //Checks that the Products span is visible
        inventorySaucePage.elements.titleSpan().should('have.text', 'Products')
        inventorySaucePage.elements.itemNameDiv().should("be.visible")
    })

    //This method makes the login with the performance_glitch_user credentials
    it('Login performance_glitch_user', () => {
        //types the credentials into the login form and click on login button
        homeSaucePage.loginPerformanceGlitchUser()
        //Checks that the span Products is visible
        inventorySaucePage.elements.titleSpan().should('have.text', 'Products')
        //The names of the items should be visible
        inventorySaucePage.elements.itemNameDiv().should("be.visible")
    })

})