import sauceCart from "../../pages/saucePage/sauceCart";
import inventorySaucePage from "../../pages/saucePage/inventorySaucePage";
import homeSaucePage from "../../pages/saucePage/homeSaucePage"
import checkout from "../../pages/saucePage/checkout"

describe("Suite to do the Entire checkout process", () => {

    beforeEach(() => {
        homeSaucePage.navigateHomePage()

        //Login into the page
        homeSaucePage.loginStandardUser()
        //The span products must be visible after login
        inventorySaucePage.elements.titleSpan().should('have.text', 'Products')
        //Also the names of the product must be visible
        inventorySaucePage.elements.itemNameDiv().should("be.visible")

    })

    it("Validate elements are displayed correctly", () => {
        inventorySaucePage.goToCart()

        checkout.checkElementsAreCorrectlyDisplayed()
    })

    it("Validating the fields of the information form", () => {
        let time = 1000

        let name = 'Carlos'
        let lastName = 'Magana'
        let postalCode = '0000'
        //Amount of items we want in the cart for the checkout process
        inventorySaucePage.goToCart()

        sauceCart.clickCheckoutBtn()

        checkout.validateCheckInformationForm(name, lastName, postalCode)
    })

    it("Validating checkout overview item names", () => {
        let cartItemNames = []
        let amount = 3

        for (let i = 0; i < amount; i++)
            inventorySaucePage.clickOnAddToCart()

        inventorySaucePage.goToCart()

        for (let i = 0; i < amount; i++)
            sauceCart.pushCartItemNamesIntoArray(cartItemNames, i)

        sauceCart.clickCheckoutBtn()

        checkout.validateCheckInformationForm("Carlos", "Magana", "0000")

        checkout.clickContinueButton()

        cy.log(cartItemNames).then(() => {
            cy.log(cartItemNames.length)
            for (let i = 0; i < cartItemNames.length; i++)
                checkout.compareCartAndCheckoutItemNames(i, cartItemNames[i])
        })
    })

    it("Validating checkout overview item prices", () => {
        let cartItemPrices = []
        let amount = 3

        for (let i = 0; i < amount; i++)
            inventorySaucePage.clickOnAddToCart()

        inventorySaucePage.goToCart()

        for (let i = 0; i < amount; i++)
            sauceCart.pushCartItemPricesIntoArray(cartItemPrices, i)

        sauceCart.clickCheckoutBtn()

        checkout.validateCheckInformationForm("Carlos", "Magana", "0000")

        checkout.clickContinueButton()

        cy.log(cartItemPrices).then(() => {
            cy.log(cartItemPrices.length)
            for (let i = 0; i < cartItemPrices.length; i++)
                checkout.compareCartAndCheckoutItemPrices(i, cartItemPrices[i])
        })
    })


    it("Validating checkout overview Item Total", () => {
        let cartItemPrices = []
        let sumItemPrices = 0
        let amount = 3

        for (let i = 0; i < amount; i++)
            inventorySaucePage.clickOnAddToCart()

        inventorySaucePage.goToCart()

        for (let i = 0; i < amount; i++)
            sauceCart.pushCartItemPricesIntoArray(cartItemPrices, i)

        sauceCart.clickCheckoutBtn()

        checkout.validateCheckInformationForm("Carlos", "Magana", "0000")

        checkout.clickContinueButton()

        cy.log(cartItemPrices).then(() => {
            cy.log(cartItemPrices.length)
            let sumItemPrice = 0
            for (let i = 0; i < cartItemPrices.length; i++) {
                let itemPriceString = cartItemPrices[i].replace('$', '')
                sumItemPrice = sumItemPrice + parseFloat(itemPriceString)
                cy.log("Sum is :" + sumItemPrice)
            }
            checkout.checkSubTotalInOverview(sumItemPrice)
        })
    })

    it("Validate Item total plus Tax matches Total: ", () => {
        let cartItemPrices = []
        let amount = 3

        for (let i = 0; i < amount; i++)
            inventorySaucePage.clickOnAddToCart()

        inventorySaucePage.goToCart()

        for (let i = 0; i < amount; i++)
            sauceCart.pushCartItemPricesIntoArray(cartItemPrices, i)

        sauceCart.clickCheckoutBtn()

        checkout.validateCheckInformationForm("Carlos", "Magana", "0000")

        checkout.clickContinueButton()

        checkout.checkItemTotalPlusTaxMatchTotal()
    })
})