describe('Login Page E2E Tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/login')
    })
  
    it('requires both email and password', () => {
      cy.get('form').submit()
      cy.get('.error-message').should('contain', 'Please enter both email and password.')
    })
  
    it('handles invalid login credentials', () => {
      cy.intercept('POST', 'http://localhost:3002/login', {
        statusCode: 401,
        body: { message: 'Invalid email or password' }
      }).as('loginAttempt')
  
      cy.get('#email').type('invalid@example.com')
      cy.get('#password').type('wrongpassword')
      cy.get('form').submit()
  
      cy.wait('@loginAttempt')
      cy.get('.error-message').should('contain', 'Invalid email or password')
    })
  
    it('successfully logs in with valid credentials', () => {
      cy.intercept('POST', 'http://localhost:3002/login', {
        statusCode: 200,
        body: {
          token: 'fake-token',
          user: {
            user_id: 1,
            username: 'testuser',
            first_name: 'Test',
            last_name: 'User'
          }
        }
      }).as('loginAttempt')
  
      cy.get('#email').type('valid@example.com')
      cy.get('#password').type('correctpassword')
      cy.get('form').submit()
  
      cy.wait('@loginAttempt')
      cy.url().should('eq', 'http://localhost:5173/')
  
      // Check if token and user data are stored in localStorage
      cy.window().its('localStorage').invoke('getItem', 'token').should('eq', 'fake-token')
      cy.window().its('localStorage').invoke('getItem', 'user').should('contain', 'testuser')
    })
  
    it('remembers user when "Remember Me" is checked', () => {
      // This test would depend on how you implement the "Remember Me" functionality
      cy.get('#remember').check()
      // Add assertions based on your implementation
    })
  })
  