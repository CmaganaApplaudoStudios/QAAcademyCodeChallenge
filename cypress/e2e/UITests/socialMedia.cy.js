import socialMedia from "../../pages/saucePage/socialMedia.js";
import homeSaucePage from "../../pages/saucePage/homeSaucePage"

//Suite to validate that the buttons redirects to the correct url
describe("Social Media Suite", () => {

    //Redirect us to the saucedemo.com page before every test run
    beforeEach(() => {
        homeSaucePage.navigateHomePage()

    })

    it("Validate Facebook Button", () => {
        //types on the field username
        homeSaucePage.loginStandardUser()
        //click on Facebook button and validates the url
        socialMedia.clickOnFacebook()
    })

    it("Validate Twitter Button", () => {
        //types on the field username
        homeSaucePage.loginStandardUser()
        //click on Twitter button and validates the url
        socialMedia.clickOnTwitter()
    })

    it("Validate LinkedIn Button", () => {
        //types on the field username
        homeSaucePage.loginStandardUser()
        //click on LinkedIn button and validates the url
        socialMedia.clickOnLinkedIn()

    })


})