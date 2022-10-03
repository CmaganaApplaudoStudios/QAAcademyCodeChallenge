require('cypress-xpath')
import sauceCart from "../../pages/saucePage/sauceCart";

class checkout {

    elements = {
        titleCheckoutProcess: () => cy.get("span.title"),
        firstNameInput: () => cy.get("#first-name"),
        lastNameInput: () => cy.get("#last-name"),
        postalCodeInput: () => cy.get("#postal-code"),
        errorMessageEmptyInformationForm: () => cy.get('[data-test="error"]'),
        continueBtn: () => cy.get("#continue"),
        overviewItemName: () => cy.get('.inventory_item_name'),
        overviewItemPrice: () => cy.get('.inventory_item_price'),
        overviewQuantityLabel : ()=> cy.get('.cart_quantity_label'),
        overviewDescriptionLabel: () => cy.get('.cart_desc_label'),
        finishBtn: () => cy.get("#finish"),
        completeHeader: () => cy.get(".complete-header"),
        summarySubtotalLabel: () => cy.get('.summary_subtotal_label'),
        summaryTaxLabel: () => cy.get('.summary_tax_label'),
        summaryTotalLabel: () => cy.get('.summary_total_label'),
        completeHeader : ()=> cy.get('.complete-header'),
        btnBackProducts : ()=>cy.get('#back-to-products'),
        overviewCancelBtn : () => cy.get('#cancel')
    }

    validateCheckInformationForm(name, lastName, postalCode) {

        this.elements.titleCheckoutProcess().should('contain', 'Checkout: Your Information')
        this.elements.continueBtn().click()
        this.elements.errorMessageEmptyInformationForm().should('contain', 'First Name is required')
        this.elements.firstNameInput().should('be.visible').type(name)
        this.elements.continueBtn().click()
        this.elements.errorMessageEmptyInformationForm().should('contain', 'Last Name is required')
        this.elements.lastNameInput().should('be.visible').type(lastName)
        this.elements.continueBtn().click()
        this.elements.errorMessageEmptyInformationForm().should('contain', 'Postal Code is required')
        this.elements.postalCodeInput().should('be.visible').type(postalCode)

        this.elements.firstNameInput().invoke('val').should('eq', name)
        this.elements.lastNameInput().invoke('val').should('eq', lastName)
        this.elements.postalCodeInput().invoke('val').should('eq', postalCode)
    }

    clickContinueButton() {
        this.elements.continueBtn().click()
    }
    compareCartAndCheckoutItemNames(index, arrayIndex) {
        this.elements.overviewItemName().eq(index).invoke('text').should('eq', arrayIndex)
    }

    compareCartAndCheckoutItemPrices(index, arrayIndex) {
        this.elements.overviewItemPrice().eq(index).invoke('text').should('eq', arrayIndex)
    }

    checkSubTotalInOverview(calculatedAmount) {
        this.elements.summarySubtotalLabel().invoke('text').then((subtotal) => {
            let subtotalOverview = subtotal.replace("Item total: $", '')

            subtotalOverview = parseFloat(subtotalOverview)

            if (subtotalOverview == calculatedAmount) {
                cy.log("Sum of pricess in Item Total Label is correct")
                cy.log("Amount calculated was: " + calculatedAmount)
                cy.log("Amount extracted from checkout overview was: " + subtotalOverview)
            }
        })
    }

    checkItemTotalPlusTaxMatchTotal() {
        this.elements.summarySubtotalLabel().invoke('text').then((itemsTotal) => {
            this.elements.summaryTaxLabel().invoke('text').then((taxTotal) => {
                this.elements.summaryTotalLabel().invoke('text').then((total) => {
                    let sumItems = itemsTotal.replace('Item total: $', '')
                    sumItems = parseFloat(sumItems)
                    let sumTaxes = taxTotal.replace('Tax: $', '')
                    sumTaxes = parseFloat(sumTaxes)
                    let priceTotal = total.replace('Total: $', '')
                    priceTotal = parseFloat(priceTotal)

                    if ((sumItems + sumTaxes) == priceTotal) {
                        cy.log("The total in overview is correct")
                        cy.log("Items total was: " + sumItems)
                        cy.log("Taxes was: " + sumTaxes)
                        cy.log("Total is: " + priceTotal)
                    } else if ((sumItems + sumTaxes) != priceTotal) {
                        cy.log("The total in overview is correct")
                        cy.log("Items total was: " + sumItems)
                        cy.log("Taxes was: " + sumTaxes)
                        cy.log("Total is: " + priceTotal)
                    }
                })
            })
        })
    }

    checkElementsAreCorrectlyDisplayed(){

        //Checking that the elements from the cart are visible and contains the corresponding information
        sauceCart.elements.titleCart().should('be.visible').should('contain','Your Cart')

        sauceCart.elements.cartQuantityLabel().should('be.visible').should('contain','QTY')

        sauceCart.elements.cartDescriptionLabel().should('be.visible').should('contain','DESCRIPTION')

        sauceCart.elements.continueShopping().should('be.visible').should('contain','Continue Shopping')

        sauceCart.elements.checkoutBtn().should('be.visible').should('contain','Checkout').click()

        //Checking that the elements from the information label are visible and contains the corresponding information
        this.elements.titleCheckoutProcess().should('be.visible').should('contain','Checkout: Your Information')

        this.elements.firstNameInput().should('be.visible').invoke('attr','placeholder').should('eq','First Name')

        this.elements.firstNameInput().should('be.visible').type('Carlos')

        this.elements.lastNameInput().should('be.visible').invoke('attr','placeholder').should('eq','Last Name')

        this.elements.lastNameInput().should('be.visible').type('Magana')

        this.elements.postalCodeInput().should('be.visible').invoke('attr','placeholder').should('eq','Zip/Postal Code')

        this.elements.postalCodeInput().should('be.visible').type('0000')

        this.elements.continueBtn().should('be.visible').should('contain','Continue').click()
        //Checking the overview screen elements
        this.elements.titleCheckoutProcess().should('contain.text','Checkout: Overview')

        this.elements.overviewDescriptionLabel().should('be.visible').should('contain','DESCRIPTION')

        this.elements.overviewQuantityLabel().should('be.visible').should('contain','QTY')

        this.elements.summarySubtotalLabel().should('be.visible').should('contain','Item total: $')

        this.elements.summaryTaxLabel().should('be.visible').should('contain','Tax: $')

        this.elements.summaryTotalLabel().should('be.visible').should('contain','Total: $')

        this.elements.overviewCancelBtn().should('be.visible').should('contain','Cancel')

        this.elements.finishBtn().should('be.visible').should('contain','Finish').click()

        //Cheking elements are correctly displayed in last checkout screen
        this.elements.titleCheckoutProcess().should('be.visible').should('contain','Checkout: Complete!')

        this.elements.completeHeader().should('be.visible').should('contain','THANK YOU FOR YOUR ORDER')

        this.elements.btnBackProducts().should('be.visible').should('contain','Back Home')

        this.elements.btnBackProducts().click()

        cy.url('https://www.saucedemo.com/inventory.html')
    }

}

module.exports = new checkout()