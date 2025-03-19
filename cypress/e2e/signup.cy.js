describe('Signup Page E2E Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/signup')
  })

  it('displays signup form elements', () => {
    cy.get('h1').should('contain', 'Get Started Now')
    cy.get('#username').should('exist')
    cy.get('#first-name').should('exist')
    cy.get('#last-name').should('exist')
    cy.get('#email').should('exist')
    cy.get('#password').should('exist')
    cy.get('#agreement').should('exist')
    cy.contains('Login').should('have.attr', 'href', '/login')
  })
  it('requires terms agreement', () => {
    cy.get('#username').type('testuser')
    cy.get('#first-name').type('Test')
    cy.get('#last-name').type('User')
    cy.get('#email').type('test@example.com')
    cy.get('#password').type('password123')
    cy.get('form').submit()
    cy.on('window:alert', (text) => {
      expect(text).to.equal('You must agree to the terms and conditions.')
    })
  })

  it('successfully signs up with valid credentials', () => {
    // Mock successful registration
    cy.intercept('POST', 'http://localhost:3002/register', {
      statusCode: 201,
      body: { message: 'Registration successful' }
    })

    cy.get('#username').type('testuser')
    cy.get('#first-name').type('Test')
    cy.get('#last-name').type('User')
    cy.get('#email').type('test@example.com')
    cy.get('#password').type('validPassword123')
    cy.get('#agreement').check()
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/login')
  })

  it('handles existing user error', () => {
    // Mock conflict response
    cy.intercept('POST', 'http://localhost:3002/register', {
      statusCode: 400,
      body: { message: 'Username already exists' }
    })

    cy.get('#username').type('existinguser')
    cy.get('#first-name').type('Test')
    cy.get('#last-name').type('User')
    cy.get('#email').type('existing@example.com')
    cy.get('#password').type('password123')
    cy.get('#agreement').check()
    cy.get('button[type="submit"]').click()
    cy.on('window:alert', (text) => {
      expect(text).to.equal('Username already exists')
    })
  })
})
