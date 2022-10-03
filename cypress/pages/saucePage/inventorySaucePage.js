class inventorySaucePage {
    //Elements from the inventory page
    elements = {
        titleSpan: () => cy.get("span[class='title']"),
        itemNameDiv: () => cy.get(".inventory_item_name"),
        addToCartBtn: () => cy.get(".btn.btn_primary.btn_small.btn_inventory"),
        removeFromCartFromInventory: () => cy.get('.btn.btn_secondary.btn_small.btn_inventory'),
        shoppingCartLink: () => cy.get('a[class="shopping_cart_link"]'),
        menuBtn: () => cy.get("#react-burger-menu-btn"),
        aboutSideBarOption: () => cy.get("#about_sidebar_link"),
        inventoryItemPrice: () => cy.get('.inventory_item_price'),
        shoppingCartBadge: () => cy.get('.shopping_cart_badge')
    }

    //This adds an item to the cart by the index
    addItemNameToArray(index, arrayItems) {
        //checks that the element has the button on Add to cart state        
        this.elements.addToCartBtn().eq(0).should('contain', 'Add to cart')
        cy.wait(1000)
        //Makes click in the add to cart button of the element
        this.elements.addToCartBtn().eq(0).click()

        this.elements.itemNameDiv().eq(index).invoke('text').then((element) => {
            cy.log("Element being pushed: " + element)
            arrayItems.push(element)
        })
    }

    //This adds an item to the cart by the index
    addItemPriceToArray(index, arrayItemPrices) {
        //checks that the element has the button on Add to cart state        
        this.elements.addToCartBtn().eq(0).should('contain', 'Add to cart')
        cy.wait(1000)
        //Makes click in the add to cart button of the element
        this.elements.addToCartBtn().eq(0).click()

        this.elements.inventoryItemPrice().eq(index).invoke('text').then((element) => {
            cy.log("Element being pushed: " + element)
            arrayItemPrices.push(element)
        })
    }

    //Opens the sidebar menu and clicks on about option
    clickOnAbout() {
        //This method opens the sidebar
        this.elements.menuBtn().click()
        //This method clicks on about option
        this.elements.aboutSideBarOption().click()
        //Validate the url that its being redirected after click on about
        cy.url().should('eq', 'https://saucelabs.com/')
    }

    //makes click on the cart link
    goToCart() {
        this.elements.shoppingCartLink().click()
    }
    //Verifies that an item hasn't been added to the cart
    verifyItemNotAddedToCart(index) {
        this.elements.addToCartBtn().eq(index).should('contain', 'Add to cart')
    }

    verifyItemAddedToCart(index) {
        this.elements.removeFromCartFromInventory().eq(index).should('contain', 'Remove')
    }

    verifyAddToCartRemoveBtnStatus(amount, state) {
        if (state == "Added") {
            for (let i = 0; i < amount; i++)
                this.verifyItemAddedToCart(i)
        } else if (state == "Not Added") {
            for (let i = 0; i < amount; i++)
                this.verifyItemNotAddedToCart(i)
        }
    }

    verifyItemAmountOnCartBadge(itemAmount) {
        this.elements.shoppingCartBadge().invoke('text').should('eq', itemAmount)
    }

    clickOnAddToCart() {
        this.elements.addToCartBtn().eq(0).click()
    }

    clickRemoveFromCart() {
        this.elements.removeFromCartFromInventory().eq(0).click()
    }
}

module.exports = new inventorySaucePage()