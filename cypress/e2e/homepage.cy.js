describe('Home Page E2E Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  it('displays the hero section', () => {
    cy.get('.hero').should('exist')
    cy.get('.hero-content h1').should('contain', 'Grow Your Own, Save Our Planet')
    cy.get('.hero-content .btn').should('contain', 'Get Started Today')
  })

  it('shows feature cards with content', () => {
    cy.get('.features').should('exist')
    cy.get('.home-card').should('have.length', 3)
    cy.get('.home-card h3').eq(0).should('contain', 'Combat Climate Change')
    cy.get('.home-card h3').eq(1).should('contain', 'Build Food Resilience')
    cy.get('.home-card h3').eq(2).should('contain', 'Strengthen Communities')
  })

  it('displays the about section with mission content', () => {
    cy.get('.about').should('exist')
    cy.get('.about-content .about-text p').should('have.length.at.least', 3)
    cy.get('.about-content .about-image img').should('have.attr', 'alt', 'Community')
  })

  it('has a call-to-action section', () => {
    cy.get('.cta').should('exist')
    cy.get('.cta-content h2').should('contain', 'Ready to Get Your Hands Dirty?')
    cy.get('.cta-content .btn').should('contain', 'Register for a Workshop')
  })
})
