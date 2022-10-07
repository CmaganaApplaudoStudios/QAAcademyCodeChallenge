class sauceCart {
    //elements from the cart
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
    //removes all elements from the cart
    clearCart() {
        this.elements.removeFromCartBtn().each($button => {
            $button.click()
        })
        cy.wait(1000)
    }
    //Verifies if an item has been added to the cart
    verifyItemAddedToCart(index, itemName) {
        this.elements.itemName().eq(index).invoke('text').should('eq', itemName)
        cy.wait(1000)
    }
    //Verifies if a price form the inventory has been added to the cart
    veryfyItemPrice(index, itemPrice) {
        this.elements.cartItemPrice().eq(index).invoke('text').should('eq', itemPrice)
        cy.wait(1000)
    }
    //Removes an element form the cart
    removeElement() {
        this.elements.removeFromCartBtn().click()
        cy.wait(1000)
    }
    //Clicks on the continue shopping button
    continueShopping() {
        this.elements.continueShopping().click()
        cy.wait(1000)
    }

    clickCheckoutBtn() {
        //Checking that the checkout button is visible
        this.elements.checkoutBtn().should('be.visible')
        //cliking on the checkout button
        this.elements.checkoutBtn().click()
        cy.wait(1000)
    }
    //verify that no more elements can be removed from the cart
    verifyNoMoreItemsOnCart() {
        this.elements.removeFromCartBtn().should('not.exist')
        cy.wait(1000)
    }
    //push the name of the cart item to an array
    pushCartItemNamesIntoArray(array, index) {
        this.elements.itemName().eq(index).invoke('text').then((element) => {
            cy.log("Element being pushed:", element)
            array.push(element)
        })
        cy.wait(1000)
    }
    //push the price of an item of the cart to an array
    pushCartItemPricesIntoArray(array, index) {
        this.elements.cartItemPrice().eq(index).invoke('text').then((element) => {
            cy.log("Element being pushed:", element)
            array.push(element)
        })
    }

}

module.exports = new sauceCart()