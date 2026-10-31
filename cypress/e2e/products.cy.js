import home from '../modules/home'
import products from '../modules/products'

describe('Products', () => {
  beforeEach(() => {
    home.visit()
    home.shouldBeVisible()
    home.goToProducts()
    products.shouldShowAllProductsPage()
  })

  it('Test Case 8: Verify All Products and product detail page', () => {
    products.shouldShowProductList()
    products.viewFirstProduct()
    products.shouldShowProductDetails()
  })

  it('Test Case 9: Search Product', () => {
    const searchTerm = 'Jeans'

    products.search(searchTerm)
    products.shouldShowSearchResults(searchTerm)
  })
})
