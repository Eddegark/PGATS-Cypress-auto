import home from '../modules/home'
import login from '../modules/login'
import signup from '../modules/signup'
import products from '../modules/products'
import cart from '../modules/cart'
import checkout from '../modules/checkout'

describe('Place Order', () => {
  const productIds = [1, 2]
  const orderComment = 'Please deliver during business hours.'
  let user
  let payment

  const addProductsToCart = () => {
    home.goToProducts()
    productIds.forEach((productId) => {
      products.addToCart(productId)
      products.continueShopping()
    })
  }

  const completeCheckout = () => {
    home.goToCart()
    cart.shouldBeDisplayed(productIds)
    cart.proceedToCheckout()
    checkout.shouldShowAddressDetails(user)
    checkout.shouldShowOrderReview(productIds)
    checkout.placeOrder(orderComment)
    checkout.fillPaymentDetails(payment)
    checkout.payAndConfirmOrder()
    checkout.shouldShowOrderPlaced()
    home.deleteAccount()
    home.shouldShowAccountDeleted()
    home.continueAfterAccountDeleted()
  }

  beforeEach(() => {
    cy.buildUser().then((builtUser) => {
      user = builtUser
    })
    cy.fixture('payment').then((paymentData) => {
      payment = paymentData
    })
    home.visit()
    home.shouldBeVisible()
  })

  it('Test Case 15: Place Order: Register before Checkout', () => {
    home.goToSignupLogin()
    signup.registerUser(user)
    signup.shouldShowAccountCreated()
    signup.continueAfterAccountCreated()
    cy.shouldBeLoggedInAs(user.name)
    addProductsToCart()
    completeCheckout()
  })

  it('Test Case 16: Place Order: Login before Checkout', () => {
    cy.createUserByApi(user)
    home.goToSignupLogin()
    login.login(user.email, user.password)
    cy.shouldBeLoggedInAs(user.name)
    addProductsToCart()
    completeCheckout()
  })
})
