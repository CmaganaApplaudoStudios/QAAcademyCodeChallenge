import homeSaucePage from "../../pages/saucePage/homeSaucePage";
import inventorySaucePage from "../../pages/saucePage/inventorySaucePage";

//User story 5 Explore menu options 
describe("Suite for SideBar Testing", () => {
    //Visist the saucedemo.com page
    beforeEach(() => {
        homeSaucePage.navigateHomePage()

    })

    it.only("Clicking on about option on the sidebar and validate the url", () => {

        //Login process
        homeSaucePage.loginStandardUser()

        inventorySaucePage.elements.titleSpan().should('have.text', 'Products')
        inventorySaucePage.elements.itemNameDiv().should("be.visible")
        //Click on the about option
        inventorySaucePage.clickOnAbout()
    })


})
