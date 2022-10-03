import homeSaucePage from "../../pages/saucePage/homeSaucePage";

describe("Wrong Credentials Suite", () => {

    beforeEach(() => {
        homeSaucePage.navigateHomePage()
    })

    it("Trying to login with wrong credentials", () => {
        homeSaucePage.typeUsername("wrong_username")
        homeSaucePage.typePassword("wrong_password")
        homeSaucePage.clickLogin()

        homeSaucePage.elements.errorMessageContainer().should('be.visible')
        homeSaucePage.elements.errorMessageContainer()
            .should('contain', 'Username and password do not match any user in this service')
    })

    it("Empty username and empty password", () => {
        homeSaucePage.clickLogin()

        homeSaucePage.elements.errorMessageContainer().should('be.visible')
        homeSaucePage.elements.errorMessageContainer().should('contain', 'Username is required')

    })

    it("Empty password", () => {
        homeSaucePage.typeUsername("s")
        homeSaucePage.clickLogin()

        homeSaucePage.elements.errorMessageContainer().should('be.visible')
        homeSaucePage.elements.errorMessageContainer().should('contain', 'Password is required')

    })
})