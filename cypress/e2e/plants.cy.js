describe('Plants Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/plants'); // Visit the Plants page
  });

  it('should render the Plants page correctly', () => {
    // Check if the page title is visible
    cy.get('h1').should('contain', 'Plants');

    // Check if the search bar and help button are visible
    cy.get('.search-and-help').within(() => {
      cy.get('input[type="text"]').should('exist'); // Search input
      cy.get('.help-button').should('exist'); // Help button
    });

    // Check if the dropdown filter is visible
    cy.get('.dropdown-filter').should('exist');

    // Check if the PlantList component is visible
    cy.get('.plant-list').should('exist');
  });

  it('should update the search query when typing in the search bar', () => {
    const searchQuery = 'Rose';

    // Type into the search bar
    cy.get('.search-and-help input[type="text"]').type(searchQuery);

    // Verify that the query state is updated (if applicable)
    // This assumes the search bar updates the query state internally
    cy.get('.plant-list').should('contain', searchQuery); // Example assertion
  });

  it('should open and close the help modal', () => {
    // Open the help modal
    cy.get('.help-button').click();
    cy.get('.help-modal-overlay').should('be.visible');
    cy.get('.help-modal').should('be.visible');

    // Close the modal by clicking the close button
    cy.get('.close-modal').click();
    cy.get('.help-modal-overlay').should('not.exist');

    // Reopen the modal
    cy.get('.help-button').click();

    // Close the modal by clicking the overlay
    cy.get('.help-modal-overlay').click('topLeft'); // Click outside the modal
    cy.get('.help-modal-overlay').should('not.exist');
  });

  it('should update filters when selecting from the dropdown', () => {
    // Mock a filter selection (e.g., "Sunlight: Full Sun")
    cy.get('.dropdown-filter').within(() => {
      cy.get('select').first().select('Full Sun'); // Example dropdown interaction
    });

    // Verify that the filters state is updated (if applicable)
    // This assumes the dropdown updates the filters state internally
    cy.get('.plant-list').should('contain', 'Full Sun'); // Example assertion
  });
});
  
  