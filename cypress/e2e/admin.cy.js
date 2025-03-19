describe('Team Page E2E Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/team')
  })

  it('displays the introduction section', () => {
    cy.get('.intro h2').should('contain', 'Meet the People Behind Our Mission')
    cy.get('.intro p').should('exist')
  })

  it('shows leadership team members', () => {
    cy.get('.leadership-grid .leader-card').should('have.length', 6)
    cy.get('.leader-card').first().within(() => {
      cy.get('img').should('be.visible')
      cy.get('h3').should('contain', 'Ismael Martinez')
      cy.get('.leader-title').should('contain', 'Team Leadership')
      cy.get('.leader-bio').should('exist')
      cy.get('.read-more-link').should('have.attr', 'href').and('include', 'linkedin.com')
    })
  })

  it('displays core values section', () => {
    cy.get('.values-section h2').should('contain', 'Our Core Values')
    cy.get('.values-grid .value-card').should('have.length', 4)
    cy.get('.value-card').first().within(() => {
      cy.get('h3').should('contain', 'Integrity')
      cy.get('p').should('exist')
    })
  })

  it('shows join section', () => {
    cy.get('.join-section h2').should('contain', 'Join Our Team')
    cy.get('.join-section p').should('exist')
    cy.get('.join-section .btn').should('contain', 'Join Today!')
  })

  it('allows navigation to LinkedIn profiles', () => {
    cy.get('.leader-card').first().find('.read-more-link').should('have.attr', 'href').and('include', 'linkedin.com')
  })
})

  