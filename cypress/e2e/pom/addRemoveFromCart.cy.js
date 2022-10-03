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
        let itemAmount = 3
        for (let i = 0; i < itemAmount; i++) {
            inventorySaucePage.clickOnAddToCart()
        }
        inventorySaucePage.verifyItemAmountOnCartBadge(itemAmount.toString())
    })

    it.only("Verify Add and Remove buttons On Inventory Page", () => {
        let itemAmount = 3

        for (let i = 0; i < itemAmount; i++) {
            inventorySaucePage.clickOnAddToCart()
        }

        inventorySaucePage.verifyAddToCartRemoveBtnStatus(itemAmount, "Added")


        for (let i = 0; i < itemAmount; i++) {
            inventorySaucePage.clickRemoveFromCart()
        }

        inventorySaucePage.verifyAddToCartRemoveBtnStatus(itemAmount, "Not Added")

    })
    it.only("Add and remove items from Cart", () => {
        let itemAmount = 3

        for (let i = 0; i < itemAmount; i++) {
            inventorySaucePage.clickOnAddToCart()
        }

        inventorySaucePage.goToCart()

        sauceCart.clearCart()

        sauceCart.verifyNoMoreItemsOnCart()
    })

    it("Verify Item Names on the Cart", () => {
        let itemAmount = 3
        let itemNamesFromInventory = []

        for (let i = 0; i < itemAmount; i++) {
            inventorySaucePage.addItemNameToArray(i, itemNamesFromInventory)
        }

        inventorySaucePage.goToCart()

        cy.log(itemNamesFromInventory).then(() => {
            cy.log(itemNamesFromInventory.length)
            for (let j = 0; j < itemNamesFromInventory.length; j++) {
                sauceCart.verifyItemAddedToCart(j, itemNamesFromInventory[j])
            }
        })
    })

    it("Verify Item Prices on the Cart", () => {
        let pricesAmount = 3
        let itemPricesFromInventory = []

        for (let i = 0; i < pricesAmount; i++) {
            inventorySaucePage.addItemPriceToArray(i, itemPricesFromInventory)
        }

        inventorySaucePage.goToCart()

        cy.log(itemPricesFromInventory).then(() => {
            cy.log(itemPricesFromInventory.length)
            for (let j = 0; j < itemPricesFromInventory.length; j++) {
                sauceCart.veryfyItemPrice(j, itemPricesFromInventory[j])
            }
        })
    })

})