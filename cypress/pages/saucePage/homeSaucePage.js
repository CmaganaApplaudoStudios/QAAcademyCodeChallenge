class homeSaucePage{

    elements = {
        usernameInput: ()=> cy.get('#user-name'),
        passwordInput: ()=> cy.get('#password'),
        loginButton:    ()=> cy.get('#login-button'),
        errorMessageContainer: ()=> cy.get("h3[data-test='error']")
    }

    credentials = {
        standard_user :{"username":"standard_user","password":"secret_sauce"},
        locket_out_user : {"username":"locked_out_user","password":"secret_sauce"},
        problem_user : {"username":"problem_user","password":"secret_sauce"},
        performance_glitch_user : {"username":"performance_glitch_user","password":"secret_sauce"}
    }

    navigateHomePage(){
        cy.visit('https://www.saucedemo.com')
        cy.wait(1000)
    }

    typeUsername(username){
        this.elements.usernameInput().type(username)
    }
    typePassword(password){
        this.elements.passwordInput().type(password)
    }

    clickLogin(){
        this.elements.loginButton().click()
    }

    loginStandardUser(){
        this.typeUsername(this.credentials.standard_user.username)
        this.typePassword(this.credentials.standard_user.password)
        this.clickLogin()
    }

    loginLockedOutUser(){
        this.typeUsername(this.credentials.locket_out_user.username)
        this.typePassword(this.credentials.locket_out_user.password)
        this.clickLogin()

        this.elements.errorMessageContainer().should('be.visible').should('contain','Sorry, this user has been locked out')
    }

    loginProblemUser(){
        this.typeUsername(this.credentials.problem_user.username)
        this.typePassword(this.credentials.problem_user.password)
        this.clickLogin()
        
    }

    loginPerformanceGlitchUser(){
        this.typeUsername(this.credentials.performance_glitch_user.username)
        this.typePassword(this.credentials.performance_glitch_user.password)
        this.clickLogin()
    }

    
}

module.exports = new homeSaucePage()