import sauceCart from "../../pages/saucePage/sauceCart";

class checkout {

    //elements of the checkout process
    elements = {
        titleCheckoutProcess: () => cy.get("span.title"),
        firstNameInput: () => cy.get("#first-name"),
        lastNameInput: () => cy.get("#last-name"),
        postalCodeInput: () => cy.get("#postal-code"),
        errorMessageEmptyInformationForm: () => cy.get('[data-test="error"]'),
        continueBtn: () => cy.get("#continue"),
        overviewItemName: () => cy.get('.inventory_item_name'),
        overviewItemPrice: () => cy.get('.inventory_item_price'),
        overviewQuantityLabel: () => cy.get('.cart_quantity_label'),
        overviewDescriptionLabel: () => cy.get('.cart_desc_label'),
        finishBtn: () => cy.get("#finish"),
        completeHeader: () => cy.get(".complete-header"),
        summarySubtotalLabel: () => cy.get('.summary_subtotal_label'),
        summaryTaxLabel: () => cy.get('.summary_tax_label'),
        summaryTotalLabel: () => cy.get('.summary_total_label'),
        completeHeader: () => cy.get('.complete-header'),
        btnBackProducts: () => cy.get('#back-to-products'),
        overviewCancelBtn: () => cy.get('#cancel')
    }

    //Method to validate the check your information form
    validateCheckInformationForm(name, lastName, postalCode) {
        //We check that the fields contain the corresponding text
        this.elements.titleCheckoutProcess().should('contain', 'Checkout: Your Information')
        this.elements.continueBtn().click()
        cy.wait(1000)
        //We check that the error message asks for the empty fields 
        this.elements.errorMessageEmptyInformationForm().should('contain', 'First Name is required')
        this.elements.firstNameInput().should('be.visible').type(name)
        this.elements.continueBtn().click()
        cy.wait(1000)
        this.elements.errorMessageEmptyInformationForm().should('contain', 'Last Name is required')
        this.elements.lastNameInput().should('be.visible').type(lastName)
        this.elements.continueBtn().click()
        cy.wait(1000)
        this.elements.errorMessageEmptyInformationForm().should('contain', 'Postal Code is required')
        this.elements.postalCodeInput().should('be.visible').type(postalCode)
        //After filling the fields we check that the values are the ones pass to the method
        this.elements.firstNameInput().invoke('val').should('eq', name)
        this.elements.lastNameInput().invoke('val').should('eq', lastName)
        this.elements.postalCodeInput().invoke('val').should('eq', postalCode)
        cy.wait(1000)
    }

    //Click on continue button
    clickContinueButton() {
        this.elements.continueBtn().click()
        cy.wait(1000)
    }
    //This method compares the index of the cart name item and the array Names position
    compareCartAndCheckoutItemNames(index, arrayIndex) {
        this.elements.overviewItemName().eq(index).invoke('text').should('eq', arrayIndex)
        cy.wait(1000)
    }
    //This method compares the index of the cart price item and the array prices position
    compareCartAndCheckoutItemPrices(index, arrayIndex) {
        this.elements.overviewItemPrice().eq(index).invoke('text').should('eq', arrayIndex)
        cy.wait(1000)
    }
    //This method checks the subtotal of the checkout overview
    checkSubTotalInOverview(calculatedAmount) {
        //We first get the label text
        this.elements.summarySubtotalLabel().invoke('text').then((subtotal) => {
            //We replace the text Item total: $ with an empty string 
            let subtotalOverview = subtotal.replace("Item total: $", '')
            //Now we have to parse the text to float to compare it with the amount calculated by making the sum of the itemprices in the cart
            subtotalOverview = parseFloat(subtotalOverview)
            //If the item total from overview matches the calculated amount we print the success message
            if (subtotalOverview == calculatedAmount) {
                cy.log("Sum of pricess in Item Total Label is correct")
                cy.log("Amount calculated was: " + calculatedAmount)
                cy.log("Amount extracted from checkout overview was: " + subtotalOverview)
                cy.wait(1000)
            }
        })
    }

    //We calculate the sum of tax plus item total and see if match with total
    checkItemTotalPlusTaxMatchTotal() {
        //We first get the items total label
        this.elements.summarySubtotalLabel().invoke('text').then((itemsTotal) => {
            //now we invoke the tax total label
            this.elements.summaryTaxLabel().invoke('text').then((taxTotal) => {
                //finally we invoke the total label text
                this.elements.summaryTotalLabel().invoke('text').then((total) => {
                    //Now we replace the undesired text from each label and parse each text to float
                    let sumItems = itemsTotal.replace('Item total: $', '')
                    sumItems = parseFloat(sumItems)
                    let sumTaxes = taxTotal.replace('Tax: $', '')
                    sumTaxes = parseFloat(sumTaxes)
                    let priceTotal = total.replace('Total: $', '')
                    priceTotal = parseFloat(priceTotal)
                    cy.wait(1000)
                    //We check if the sum of taxes + items total matches the total in overview and print corresponding messages
                    if ((sumItems + sumTaxes) == priceTotal) {
                        cy.log("The total in overview is correct")
                        cy.log("Items total was: " + sumItems)
                        cy.log("Taxes was: " + sumTaxes)
                        cy.log("Total is: " + priceTotal)
                        cy.wait(1000)
                    } else if ((sumItems + sumTaxes) != priceTotal) {
                        cy.log("The total in overview is correct")
                        cy.log("Items total was: " + sumItems)
                        cy.log("Taxes was: " + sumTaxes)
                        cy.log("Total is: " + priceTotal)
                        cy.wait(1000)
                    }
                })
            })
        })
    }

    checkElementsAreCorrectlyDisplayed() {
        //Checking that the elements from the cart are visible and contains the corresponding information
        sauceCart.elements.titleCart().should('be.visible').should('contain', 'Your Cart')
        cy.wait(1000)
        sauceCart.elements.cartQuantityLabel().should('be.visible').should('contain', 'QTY')
        sauceCart.elements.cartDescriptionLabel().should('be.visible').should('contain', 'DESCRIPTION')
        sauceCart.elements.continueShopping().should('be.visible').should('contain', 'Continue Shopping')
        sauceCart.elements.checkoutBtn().should('be.visible').should('contain', 'Checkout').click()
        cy.wait(1000)
        //Checking that the elements from the information label are visible and contains the corresponding information
        this.elements.titleCheckoutProcess().should('be.visible').should('contain', 'Checkout: Your Information')
        this.elements.firstNameInput().should('be.visible').invoke('attr', 'placeholder').should('eq', 'First Name')
        this.elements.firstNameInput().should('be.visible').type('Carlos')
        this.elements.lastNameInput().should('be.visible').invoke('attr', 'placeholder').should('eq', 'Last Name')
        this.elements.lastNameInput().should('be.visible').type('Magana')
        cy.wait(1000)
        this.elements.postalCodeInput().should('be.visible').invoke('attr', 'placeholder').should('eq', 'Zip/Postal Code')
        this.elements.postalCodeInput().should('be.visible').type('0000')
        this.elements.continueBtn().should('be.visible').should('contain', 'Continue').click()
        //Checking the overview screen elements the elemens below must be visible and contain the specified text
        this.elements.titleCheckoutProcess().should('contain.text', 'Checkout: Overview')
        cy.wait(1000)
        this.elements.overviewDescriptionLabel().should('be.visible').should('contain', 'DESCRIPTION')
        this.elements.overviewQuantityLabel().should('be.visible').should('contain', 'QTY')
        this.elements.summarySubtotalLabel().should('be.visible').should('contain', 'Item total: $')
        this.elements.summaryTaxLabel().should('be.visible').should('contain', 'Tax: $')
        this.elements.summaryTotalLabel().should('be.visible').should('contain', 'Total: $')
        cy.wait(1000)
        this.elements.overviewCancelBtn().should('be.visible').should('contain', 'Cancel')
        this.elements.finishBtn().should('be.visible').should('contain', 'Finish').click()
        //Cheking elements are correctly displayed in last checkout screen and must be visible and contain the specified text
        this.elements.titleCheckoutProcess().should('be.visible').should('contain', 'Checkout: Complete!')
        this.elements.completeHeader().should('be.visible').should('contain', 'THANK YOU FOR YOUR ORDER')
        this.elements.btnBackProducts().should('be.visible').should('contain', 'Back Home')
        cy.wait(1000)
        this.elements.btnBackProducts().click()
        //going back to baseurl
        cy.url('https://www.saucedemo.com/inventory.html')
        cy.wait(1000)
    }

}

module.exports = new checkout()