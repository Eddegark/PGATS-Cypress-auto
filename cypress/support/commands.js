const parseApiBody = (body) => (typeof body === 'string' ? JSON.parse(body) : body)

Cypress.Commands.add('buildUser', () => {
  return cy.fixture('user').then((baseUser) => ({
    ...baseUser,
    email: `qa.${Date.now()}.${Cypress._.random(1000, 9999)}@mailtest.com`
  }))
})

Cypress.Commands.add('createUserByApi', (user) => {
  cy.request({
    method: 'POST',
    url: '/api/createAccount',
    form: true,
    body: {
      name: user.name,
      email: user.email,
      password: user.password,
      title: user.title,
      birth_date: user.birthDay,
      birth_month: user.birthMonth,
      birth_year: user.birthYear,
      firstname: user.firstName,
      lastname: user.lastName,
      company: user.company,
      address1: user.address,
      address2: user.address2,
      country: user.country,
      zipcode: user.zipcode,
      state: user.state,
      city: user.city,
      mobile_number: user.mobileNumber
    }
  }).then(({ body }) => {
    expect(parseApiBody(body).responseCode).to.eq(201)
  })
})

Cypress.Commands.add('deleteUserByApi', (user) => {
  cy.request({
    method: 'DELETE',
    url: '/api/deleteAccount',
    form: true,
    body: { email: user.email, password: user.password }
  })
})

Cypress.Commands.add('shouldBeLoggedInAs', (userName) => {
  cy.get('#header').contains('a', 'Logged in as').should('be.visible').and('contain.text', userName)
})
