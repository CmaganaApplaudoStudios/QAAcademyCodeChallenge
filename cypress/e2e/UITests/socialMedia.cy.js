import socialMedia from "../../pages/saucePage/socialMedia.js";
import homeSaucePage from "../../pages/saucePage/homeSaucePage"

//Suite to validate that the buttons redirects to the correct url
describe("Social Media Suite", () => {
    //Redirect us to the saucedemo.com page before every test run
    beforeEach(() => {
        homeSaucePage.navigateHomePage()
    })
    it("Validate Facebook Button", () => {
        //Makes the login process
        homeSaucePage.loginStandardUser()
        //click on Facebook button and validates the url
        socialMedia.clickOnSocialMediaButton("Facebook")
    })
    it("Validate Twitter Button", () => {
        //Makes the login process
        homeSaucePage.loginStandardUser()
        //click on Twitter button and validates the url
        socialMedia.clickOnSocialMediaButton("Twitter")
    })
    it("Validate LinkedIn Button", () => {
        //Makes the login process
        homeSaucePage.loginStandardUser()
        //click on LinkedIn button and validates the url
        socialMedia.clickOnSocialMediaButton("LinkedIn")
    })
})