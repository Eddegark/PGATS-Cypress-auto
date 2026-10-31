class Signup {
  shouldShowSignupForm() {
    cy.get('.signup-form h2').should('be.visible').and('contain.text', 'New User Signup!')
  }

  startSignup(name, email) {
    cy.get('[data-qa="signup-name"]').type(name)
    cy.get('[data-qa="signup-email"]').type(email)
    cy.get('[data-qa="signup-button"]').click()
  }

  shouldShowExistingEmailError() {
    cy.get('.signup-form p').should('be.visible').and('contain.text', 'Email Address already exist!')
  }

  shouldShowAccountInformationForm() {
    cy.contains('h2.title', 'Enter Account Information').should('be.visible')
  }

  fillAccountInformation(user) {
    cy.get(user.title === 'Mr' ? '#id_gender1' : '#id_gender2').check()
    cy.get('[data-qa="name"]').should('have.value', user.name)
    cy.get('[data-qa="email"]').should('have.value', user.email)
    cy.get('[data-qa="password"]').type(user.password, { log: false })
    cy.get('[data-qa="days"]').select(user.birthDay)
    cy.get('[data-qa="months"]').select(user.birthMonth)
    cy.get('[data-qa="years"]').select(user.birthYear)
    cy.get('#newsletter').check()
    cy.get('#optin').check()
  }

  fillAddressInformation(user) {
    cy.get('[data-qa="first_name"]').type(user.firstName)
    cy.get('[data-qa="last_name"]').type(user.lastName)
    cy.get('[data-qa="company"]').type(user.company)
    cy.get('[data-qa="address"]').type(user.address)
    cy.get('[data-qa="address2"]').type(user.address2)
    cy.get('[data-qa="country"]').select(user.country)
    cy.get('[data-qa="state"]').type(user.state)
    cy.get('[data-qa="city"]').type(user.city)
    cy.get('[data-qa="zipcode"]').type(user.zipcode)
    cy.get('[data-qa="mobile_number"]').type(user.mobileNumber)
  }

  createAccount() {
    cy.get('[data-qa="create-account"]').click()
  }

  shouldShowAccountCreated() {
    cy.get('[data-qa="account-created"]').should('be.visible').and('contain.text', 'Account Created!')
  }

  continueAfterAccountCreated() {
    cy.get('[data-qa="continue-button"]').click()
  }

  registerUser(user) {
    this.startSignup(user.name, user.email)
    this.shouldShowAccountInformationForm()
    this.fillAccountInformation(user)
    this.fillAddressInformation(user)
    this.createAccount()
  }
}

export default new Signup()
