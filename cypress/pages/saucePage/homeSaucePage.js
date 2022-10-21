class homeSaucePage {
    //Elements of the home page
    elements = {
        usernameInput: () => cy.get('#user-name'),
        passwordInput: () => cy.get('#password'),
        loginButton: () => cy.get('#login-button'),
        errorMessageContainer: () => cy.get("h3[data-test='error']")
    }
    //Credentials for every user type
    credentials = {
        standard_user: { "username": "standard_user", "password": "secret_sauce" },
        locket_out_user: { "username": "locked_out_user", "password": "secret_sauce" },
        problem_user: { "username": "problem_user", "password": "secret_sauce" },
        performance_glitch_user: { "username": "performance_glitch_user", "password": "secret_sauce" }
    }
    //method that navigates to the sauce page
    navigateHomePage() {
        cy.visit('https://www.saucedemo.com')
        cy.wait(1000)
    }
    //Types on the username filed of the login
    typeUsername(username) {
        this.elements.usernameInput().type(username)
        cy.wait(1000)
    }
    //types on the password field of the login
    typePassword(password) {
        this.elements.passwordInput().type(password)
        cy.wait(1000)
    }
    //clicks on the login button
    clickLogin() {
        this.elements.loginButton().click()
        cy.wait(1000)
    }
    //Makes the login process with standard user credentials
    loginStandardUser() {
        this.typeUsername(this.credentials.standard_user.username)
        this.typePassword(this.credentials.standard_user.password)
        this.clickLogin()
        cy.wait(1000)
    }
    //Makes the login process with lockedout user credentials
    loginLockedOutUser() {
        this.typeUsername(this.credentials.locket_out_user.username)
        this.typePassword(this.credentials.locket_out_user.password)
        this.clickLogin()
        cy.wait(1000)
        this.elements.errorMessageContainer().should('be.visible').should('contain', 'Sorry, this user has been locked out')
    }
    //Makes the login process with problem user credentials
    loginProblemUser() {
        this.typeUsername(this.credentials.problem_user.username)
        this.typePassword(this.credentials.problem_user.password)
        this.clickLogin()
        cy.wait(1000)
    }
    //Makes the login process with performance glitch user credentials
    loginPerformanceGlitchUser() {
        this.typeUsername(this.credentials.performance_glitch_user.username)
        this.typePassword(this.credentials.performance_glitch_user.password)
        this.clickLogin()
        cy.wait(1000)
    }
}
module.exports = new homeSaucePage()