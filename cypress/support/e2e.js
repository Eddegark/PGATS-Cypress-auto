import 'cypress-mochawesome-reporter/register'
import './commands'

const adHosts = /googlesyndication|googleadservices|doubleclick|adservice\.google|fundingchoicesmessages/

beforeEach(() => {
  cy.intercept({ hostname: adHosts }, { statusCode: 204, body: '' })
})
