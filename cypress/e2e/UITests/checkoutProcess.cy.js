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

    //Checking that the elements on the checkout process are displayed correctly
    it("Validate elements are displayed correctly", () => {
        //Going to the cart
        inventorySaucePage.goToCart()
        //Checking on the checkout process that elements are displayed
        checkout.checkElementsAreCorrectlyDisplayed()
    })

    it("Validating the fields of the information form", () => {
        let time = 1000

        let name = 'Carlos'
        let lastName = 'Magana'
        let postalCode = '0000'
        //Amount of items we want in the cart for the checkout process
        inventorySaucePage.goToCart()
        //clicking on the checkout button
        sauceCart.clickCheckoutBtn()
        //Validating that the information form contains the information typed and the placeholders
        checkout.validateCheckInformationForm(name, lastName, postalCode)
    })

    //Validating the overview item names
    it("Validating checkout overview item names", () => {
        //array that will contain the names from the cart
        let cartItemNames = []
        //amount of items that are going to be added to the cart
        let amount = 3
        //We add the amount of elements to the cart
        for (let i = 0; i < amount; i++)
            inventorySaucePage.clickOnAddToCart()
        //We go to the cart
        inventorySaucePage.goToCart()

        for (let i = 0; i < amount; i++)
        //We push the names of the cart into the array that will contain them
            sauceCart.pushCartItemNamesIntoArray(cartItemNames, i)
        //We click on the checkout button
        sauceCart.clickCheckoutBtn()
        //We fill the form with the information required
        checkout.validateCheckInformationForm("Carlos", "Magana", "0000")
        //click on continue button
        checkout.clickContinueButton()
        //We make a promise after printing the names of the cart section
        cy.log(cartItemNames).then(() => {
            //We print the lenght of the array
            cy.log(cartItemNames.length)
            //iterate one by one name from the cart and comparing it with the overview elements
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
            //Method that compares every item price from overview with cart prices
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
            //Method that validates the sum of the prices of items with total items in overview
            checkout.checkSubTotalInOverview(sumItemPrice)
        })
    })

    //Test to validate that the total items plus tax mathes the total
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
        //Method that validates the sum of items plus tax with total
        checkout.checkItemTotalPlusTaxMatchTotal()
    })
})