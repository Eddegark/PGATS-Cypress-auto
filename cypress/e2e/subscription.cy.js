import home from '../modules/home'
import subscription from '../modules/subscription'

describe('Subscription', () => {
  it('Test Case 10: Verify Subscription in home page', () => {
    cy.buildUser().then((user) => {
      home.visit()
      home.shouldBeVisible()
      subscription.scrollToFooter()
      subscription.shouldShowSubscriptionTitle()
      subscription.subscribe(user.email)
      subscription.shouldShowSuccessMessage()
    })
  })
})
