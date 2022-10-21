import sauceCart, { verifyNoMoreItemsOnCart } from "../../pages/saucePage/sauceCart";
import inventorySaucePage, { clickOnAddToCart } from "../../pages/saucePage/inventorySaucePage";
import homeSaucePage from "../../pages/saucePage/homeSaucePage"

//We define the amount of items we want to add to the cart
const amount = 3
//Array that will contain the desired information from the items
let array = []
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
        //We make a for cycle to iterative add one by one items
        for (let i = 0; i < amount; i++) {
            //We call the method clickOnAddToCart to add an item to the cart
            inventorySaucePage.clickOnAddToCart()
        }
        //We verify the amount of items added on the cart Badge item passing the variable itemAmount in string format
        inventorySaucePage.verifyItemAmountOnCartBadge(amount.toString())
    })
    //Verifying that the status for buttons is correct
    it.only("Verify Add and Remove buttons On Inventory Page", () => {
        let itemName = "Sauce Labs Backpack"
        inventorySaucePage.verifyAddToCartRemoveBtnStatus(itemName)
    })
    it("Add and remove items from Cart", () => {
        //Clicking on add to cart button from inventory
        for (let i = 0; i < amount; i++) {
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
        for (let i = 0; i < amount; i++) {
            //Adding the item from the inventory to the array
            inventorySaucePage.addItemNameToArray(i, array)
        }
        //Going to the cart
        inventorySaucePage.goToCart()
        //Printing the entire array of names
        cy.log(array).then(() => {
            //Printing the size of the array
            cy.log(array.length)
            //iterating one by one the names of the array and the names on the cart
            for (let j = 0; j < array.length; j++) {
                sauceCart.verifyItemAddedToCart(j, array[j])
            }
        })
    })
    //Verifying the prices on the cart
    it("Verify Item Prices on the Cart", () => {
        //overwriting the global array to clean it and use it again
        array = []
        for (let i = 0; i < amount; i++) {
            //Adding the prices from the inventory to the prices array
            inventorySaucePage.addItemPriceToArray(i, array)
        }
        //Going to the cart
        inventorySaucePage.goToCart()
        //showing the prices array
        cy.log(array).then(() => {
            //Showing the amount of prices must the the same as prices amount
            cy.log(array.length)
            //iterating price by price and comparing it each other cart vs inventory
            for (let j = 0; j < array.length; j++) {
                sauceCart.veryfyItemPrice(j, array[j])
            }
        })
    })
})