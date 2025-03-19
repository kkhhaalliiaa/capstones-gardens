describe('Chatbot Core Features', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/plants')
  })
  
    it('should display initial greeting message', () => {
      cy.get('.chatbot-icon').click();
      cy.get('.message.assistant').first().should('contain', 'Hello! I am your gardening assistant');
    });
  
    it.only('should toggle chatbox with icon click', () => {
      cy.get('.chatbot-icon').click();
      cy.get('.chatbox').should('be.visible');
      cy.get('.chatbot-icon').click();
      cy.get('.chatbox').should('not.exist');
    });
  
   
  });
  