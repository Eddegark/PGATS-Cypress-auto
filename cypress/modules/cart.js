class Cart {
  shouldBeDisplayed(productIds) {
    cy.location('pathname').should('eq', '/view_cart')
    cy.get('#cart_info_table').should('be.visible')
    productIds.forEach((productId) => {
      cy.get(`#cart_info_table #product-${productId}`).should('be.visible')
    })
  }

  proceedToCheckout() {
    cy.get('#do_action .check_out').click()
  }
}

export default new Cart()
