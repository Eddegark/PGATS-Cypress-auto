class Home {
  visit() {
    cy.visit('/')
  }

  shouldBeVisible() {
    cy.location('pathname').should('eq', '/')
    cy.get('#slider').should('be.visible')
  }

  goToSignupLogin() {
    cy.get('#header a[href="/login"]').click()
  }

  goToProducts() {
    cy.get('#header a[href="/products"]').click()
  }

  goToCart() {
    cy.get('#header a[href="/view_cart"]').click()
  }

  logout() {
    cy.get('#header a[href="/logout"]').click()
  }

  deleteAccount() {
    cy.get('#header a[href="/delete_account"]').click()
  }

  shouldShowAccountDeleted() {
    cy.get('[data-qa="account-deleted"]').should('be.visible').and('contain.text', 'Account Deleted!')
  }

  continueAfterAccountDeleted() {
    cy.get('[data-qa="continue-button"]').click()
    this.shouldBeVisible()
  }
}

export default new Home()
