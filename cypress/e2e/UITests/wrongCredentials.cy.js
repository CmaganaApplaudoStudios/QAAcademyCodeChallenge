import homeSaucePage from "../../pages/saucePage/homeSaucePage";

describe("Wrong Credentials Suite", () => {

    //Method to navigate to sauce page
    beforeEach(() => {
        homeSaucePage.navigateHomePage()
    })

    //Typing wrong both username and password
    it("Trying to login with wrong credentials", () => {
        homeSaucePage.typeUsername("wrong_username")
        homeSaucePage.typePassword("wrong_password")
        //Clicking on login button
        homeSaucePage.clickLogin()

        //The error message must be visible
        homeSaucePage.elements.errorMessageContainer().should('be.visible')
        //The error message must contain the defined message for wrong user and password
        homeSaucePage.elements.errorMessageContainer()
            .should('contain', 'Username and password do not match any user in this service')
    })

    //Empty username and empty password case
    it("Empty username and empty password", () => {
        //Clicking on login
        homeSaucePage.clickLogin()
        //Error Message must be visible
        homeSaucePage.elements.errorMessageContainer().should('be.visible')
        //The error message must contain Username is required
        homeSaucePage.elements.errorMessageContainer().should('contain', 'Username is required')

    })

    //Empty password login
    it("Empty password", () => {
        //Filling the username with something
        homeSaucePage.typeUsername("s")
        //clicking on login
        homeSaucePage.clickLogin()
        //The error message should be visible
        homeSaucePage.elements.errorMessageContainer().should('be.visible')
        //The error message must contain Password is required
        homeSaucePage.elements.errorMessageContainer().should('contain', 'Password is required')

    })
})