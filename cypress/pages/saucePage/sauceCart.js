require('cypress-xpath')
class sauceCart {
    elements = {
        removeFromCartBtn: () => cy.get(".btn.btn_secondary.btn_small.cart_button"),
        titleCart : () => cy.get('span.title'),
        itemName: () => cy.get(".inventory_item_name"),
        continueShopping: () => cy.get("#continue-shopping"),
        checkoutBtn: () => cy.get('#checkout'),
        cartItemPrice: () => cy.get('.inventory_item_price'),
        cartQuantityLabel : ()=>cy.get('.cart_quantity_label'),
        cartDescriptionLabel:()=>cy.get('.cart_desc_label')
    }

    clearCart() {
        this.elements.removeFromCartBtn().each($button => {
            $button.click()
        })
    }

    verifyItemAddedToCart(index, itemName) {
        this.elements.itemName().eq(index).invoke('text').should('eq', itemName)
    }

    veryfyItemPrice(index, itemPrice) {
        this.elements.cartItemPrice().eq(index).invoke('text').should('eq', itemPrice)
    }
    removeElement() {
        this.elements.removeFromCartBtn().click()
    }

    continueShopping() {
        this.elements.continueShopping().click()
    }

    clickCheckoutBtn() {
        //Checking that the checkout button is visible
        this.elements.checkoutBtn().should('be.visible')
        //cliking on the checkout button
        this.elements.checkoutBtn().click()
    }

    verifyNoMoreItemsOnCart() {
        this.elements.removeFromCartBtn().should('not.exist')
    }

    pushCartItemNamesIntoArray(array, index) {
        this.elements.itemName().eq(index).invoke('text').then((element) => {
            cy.log("Element being pushed:", element)
            array.push(element)
        })
    }

    pushCartItemPricesIntoArray(array, index) {
        this.elements.cartItemPrice().eq(index).invoke('text').then((element) => {
            cy.log("Element being pushed:", element)
            array.push(element)
        })
    }
}

module.exports = new sauceCart()