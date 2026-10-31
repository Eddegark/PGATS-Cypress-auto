import home from '../modules/home'
import login from '../modules/login'
import signup from '../modules/signup'

describe('User Account', () => {
  let user

  beforeEach(() => {
    cy.buildUser().then((builtUser) => {
      user = builtUser
    })
    home.visit()
    home.shouldBeVisible()
    home.goToSignupLogin()
  })

  it('Test Case 1: Register User', () => {
    signup.shouldShowSignupForm()
    signup.registerUser(user)
    signup.shouldShowAccountCreated()
    signup.continueAfterAccountCreated()
    cy.shouldBeLoggedInAs(user.name)
    home.deleteAccount()
    home.shouldShowAccountDeleted()
    home.continueAfterAccountDeleted()
  })

  it('Test Case 2: Login User with correct email and password', () => {
    cy.createUserByApi(user)
    login.shouldShowLoginForm()
    login.login(user.email, user.password)
    cy.shouldBeLoggedInAs(user.name)
    home.deleteAccount()
    home.shouldShowAccountDeleted()
  })

  it('Test Case 3: Login User with incorrect email and password', () => {
    login.shouldShowLoginForm()
    login.login(user.email, 'WrongPassword@1')
    login.shouldShowInvalidCredentialsError()
  })

  context('With registered user', () => {
    beforeEach(() => {
      cy.createUserByApi(user)
    })

    afterEach(() => {
      cy.deleteUserByApi(user)
    })

    it('Test Case 4: Logout User', () => {
      login.shouldShowLoginForm()
      login.login(user.email, user.password)
      cy.shouldBeLoggedInAs(user.name)
      home.logout()
      login.shouldShowLoginForm()
    })

    it('Test Case 5: Register User with existing email', () => {
      signup.shouldShowSignupForm()
      signup.startSignup(user.name, user.email)
      signup.shouldShowExistingEmailError()
    })
  })
})
