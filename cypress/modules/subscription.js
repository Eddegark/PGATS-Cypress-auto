class Subscription {
  scrollToFooter() {
    cy.get('#footer').scrollIntoView()
  }

  shouldShowSubscriptionTitle() {
    cy.get('#footer .single-widget h2').should('be.visible').and('contain.text', 'Subscription')
  }

  subscribe(email) {
    cy.get('#susbscribe_email').type(email)
    cy.get('#subscribe').click()
  }

  shouldShowSuccessMessage() {
    cy.get('#success-subscribe').should('be.visible').and('contain.text', 'You have been successfully subscribed!')
  }
}

export default new Subscription()
