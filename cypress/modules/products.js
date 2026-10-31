class Products {
  shouldShowAllProductsPage() {
    cy.location('pathname').should('eq', '/products')
    cy.get('.features_items h2.title').should('be.visible').and('contain.text', 'All Products')
  }

  shouldShowProductList() {
    cy.get('.features_items .product-image-wrapper').should('have.length.greaterThan', 0).first().should('be.visible')
  }

  viewFirstProduct() {
    cy.get('.features_items .choose a[href^="/product_details/"]').first().click()
  }

  shouldShowProductDetails() {
    cy.location('pathname').should('match', /^\/product_details\/\d+$/)
    cy.get('.product-information').within(() => {
      cy.get('h2').should('be.visible').and('not.be.empty')
      cy.contains('p', 'Category:').should('be.visible')
      cy.contains('span', 'Rs.').should('be.visible')
      cy.contains('p', 'Availability:').should('be.visible')
      cy.contains('p', 'Condition:').should('be.visible')
      cy.contains('p', 'Brand:').should('be.visible')
    })
  }

  search(productName) {
    cy.get('#search_product').type(productName)
    cy.get('#submit_search').click()
  }

  shouldShowSearchResults(productName) {
    cy.get('.features_items h2.title').should('be.visible').and('contain.text', 'Searched Products')
    cy.get('.features_items .productinfo p')
      .should('have.length.greaterThan', 0)
      .each(($productName) => {
        expect($productName.text().toLowerCase()).to.contain(productName.toLowerCase())
      })
  }

  addToCart(productId) {
    cy.get(`.productinfo [data-product-id="${productId}"]`).click()
    cy.get('#cartModal').should('be.visible')
  }

  continueShopping() {
    cy.get('#cartModal .close-modal').click()
    cy.get('#cartModal').should('not.be.visible')
  }
}

export default new Products()
