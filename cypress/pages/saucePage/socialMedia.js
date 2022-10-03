class socialMedia {
    elements = {
        twitterBtn: () => cy.get(".social_twitter"),
        facebookBtn: () => cy.get(".social_facebook"),
        linkedinBtn: () => cy.get(".social_linkedin")
    }

    clickOnTwitter() {
        //clicks on twitter button
        this.elements.twitterBtn().should('be.visible').click()
        //Validates the current url match with the provided in the parameter
        cy.url('https://twitter.com/saucelabs')
    }
    clickOnFacebook() {
        //click on the facebook button
        this.elements.facebookBtn().should('be.visible').click()
        //Validates the current url match with the provided in the parameter
        cy.url('https://www.facebook.com/saucelabs')
    }
    clickOnLinkedIn() {
        //clicks on LinkedIn button
        this.elements.linkedinBtn().should('be.visible').click()
        //Validates the current url match with the provided in the parameter
        cy.url('https://www.linkedin.com/company/sauce-labs/')
    }
}

module.exports = new socialMedia()