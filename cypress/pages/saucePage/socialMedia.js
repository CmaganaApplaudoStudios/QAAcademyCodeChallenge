class socialMedia {
    //Function to validate the url from the social media buttons we pass the name of the social media
    clickOnSocialMediaButton(socialMediaName) {
        //We invoke the href of the button
        cy.contains(socialMediaName).invoke('attr', 'href').then(href => {
            //We print the href of the button
            cy.log(href)
            //Then remove the target attribute to not open another tab and make click
            cy.contains(socialMediaName).invoke('removeAttr', 'target').click()
            //Finally we compare the href that we get from the button to the actual url
            cy.url().should('eq', href)
        })
    }
}
module.exports = new socialMedia()