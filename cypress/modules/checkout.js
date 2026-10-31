class Checkout {
  shouldShowAddressDetails(user) {
    cy.location('pathname').should('eq', '/checkout')
    cy.get('#address_delivery')
      .should('be.visible')
      .and('contain.text', `${user.firstName} ${user.lastName}`)
      .and('contain.text', user.address)
      .and('contain.text', user.city)
      .and('contain.text', user.country)
      .and('contain.text', user.mobileNumber)
  }

  shouldShowOrderReview(productIds) {
    cy.contains('h2.heading', 'Review Your Order').should('be.visible')
    productIds.forEach((productId) => {
      cy.get(`#cart_info #product-${productId}`).should('be.visible')
    })
  }

  placeOrder(comment) {
    cy.get('#ordermsg textarea[name="message"]').type(comment)
    cy.get('a[href="/payment"]').click()
  }

  fillPaymentDetails(payment) {
    cy.get('[data-qa="name-on-card"]').type(payment.nameOnCard)
    cy.get('[data-qa="card-number"]').type(payment.cardNumber, { log: false })
    cy.get('[data-qa="cvc"]').type(payment.cvc, { log: false })
    cy.get('[data-qa="expiry-month"]').type(payment.expiryMonth)
    cy.get('[data-qa="expiry-year"]').type(payment.expiryYear)
  }

  payAndConfirmOrder() {
    cy.get('[data-qa="pay-button"]').click()
  }

  shouldShowOrderPlaced() {
    cy.location('pathname').should('include', '/payment_done')
    cy.get('[data-qa="order-placed"]').should('be.visible').and('contain.text', 'Order Placed!')
    cy.contains('p', 'Congratulations! Your order has been confirmed!').should('be.visible')
  }
}

export default new Checkout()
