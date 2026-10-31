class Login {
  shouldShowLoginForm() {
    cy.location('pathname').should('eq', '/login')
    cy.get('.login-form h2').should('be.visible').and('contain.text', 'Login to your account')
  }

  login(email, password) {
    cy.get('[data-qa="login-email"]').type(email)
    cy.get('[data-qa="login-password"]').type(password, { log: false })
    cy.get('[data-qa="login-button"]').click()
  }

  shouldShowInvalidCredentialsError() {
    cy.get('.login-form p').should('be.visible').and('contain.text', 'Your email or password is incorrect!')
  }
}

export default new Login()
