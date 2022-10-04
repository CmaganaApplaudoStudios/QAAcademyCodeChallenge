import sauceCart, { verifyNoMoreItemsOnCart } from "../../pages/saucePage/sauceCart";
import inventorySaucePage, { clickOnAddToCart } from "../../pages/saucePage/inventorySaucePage";
import homeSaucePage from "../../pages/saucePage/homeSaucePage"

describe("Suite to Add to Cart Process", () => {

    beforeEach(() => {
        homeSaucePage.navigateHomePage()
        //Login into the page
        homeSaucePage.loginStandardUser()
        //Checking that the products span is visible
        inventorySaucePage.elements.titleSpan().should('have.text', 'Products')
        //Checking that the item names are visible
        inventorySaucePage.elements.itemNameDiv().should("be.visible")
    })


    it("Verify Amount of items Added to cart in cart badge", () => {
        //We define the amount of items we want to add to the cart
        let itemAmount = 3
        //We make a for cycle to iterative add one by one items
        for (let i = 0; i < itemAmount; i++) {
            //We call the method clickOnAddToCart to add an item to the cart
            inventorySaucePage.clickOnAddToCart()
        }
        //We verify the amount of items added on the cart Badge item passing the variable itemAmount in string format
        inventorySaucePage.verifyItemAmountOnCartBadge(itemAmount.toString())
    })

    //Verifying that the status for buttons is correct
    it("Verify Add and Remove buttons On Inventory Page", () => {
        //Defining an amount of items
        let itemAmount = 3
        //Clicking on add to cart
        for (let i = 0; i < itemAmount; i++) {
            inventorySaucePage.clickOnAddToCart()
        }
        //Checking that the buttons of the items has the state added 
        inventorySaucePage.verifyAddToCartRemoveBtnStatus(itemAmount, "Added")

        //Clicking on the buttons to remove
        for (let i = 0; i < itemAmount; i++) {
            inventorySaucePage.clickRemoveFromCart()
        }
        //Checking that the buttons has the status not added
        inventorySaucePage.verifyAddToCartRemoveBtnStatus(itemAmount, "Not Added")

    })

    it("Add and remove items from Cart", () => {
        //Defining an amount of items to add
        let itemAmount = 3
        //Clicking on add to cart button from inventory
        for (let i = 0; i < itemAmount; i++) {
            inventorySaucePage.clickOnAddToCart()
        }
        //click on the cart icon to go to cart
        inventorySaucePage.goToCart()
        //Clearing the cart
        sauceCart.clearCart()
        //Checking that there are no more items on the cart
        sauceCart.verifyNoMoreItemsOnCart()
    })
    //Verify the item names on the cart
    it("Verify Item Names on the Cart", () => {
        let itemAmount = 3
        //Array that will contain the names from the items selected on the inventory
        let itemNamesFromInventory = []

        for (let i = 0; i < itemAmount; i++) {
            //Adding the item from the inventory to the array
            inventorySaucePage.addItemNameToArray(i, itemNamesFromInventory)
        }
        //Going to the cart
        inventorySaucePage.goToCart()
        //Printing the entire array of names
        cy.log(itemNamesFromInventory).then(() => {
            //Printing the size of the array
            cy.log(itemNamesFromInventory.length)
            //iterating one by one the names of the array and the names on the cart
            for (let j = 0; j < itemNamesFromInventory.length; j++) {
                sauceCart.verifyItemAddedToCart(j, itemNamesFromInventory[j])
            }
        })
    })

    //Verifying the prices on the cart
    it("Verify Item Prices on the Cart", () => {
        let pricesAmount = 3
        //Array that will contain the prices of the cart
        let itemPricesFromInventory = []

        for (let i = 0; i < pricesAmount; i++) {
            //Adding the prices from the inventory to the prices array
            inventorySaucePage.addItemPriceToArray(i, itemPricesFromInventory)
        }
        //Going to the cart
        inventorySaucePage.goToCart()
        //showing the prices array
        cy.log(itemPricesFromInventory).then(() => {
            //Showing the amount of prices must the the same as prices amount
            cy.log(itemPricesFromInventory.length)
            //iterating price by price and comparing it each other cart vs inventory
            for (let j = 0; j < itemPricesFromInventory.length; j++) {
                sauceCart.veryfyItemPrice(j, itemPricesFromInventory[j])
            }
        })
    })

})