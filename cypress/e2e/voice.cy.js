describe('empty spec', () => {

  it('passes', function () {
    cy.visit('http://127.0.0.1:5500/')
    cy.fixture('example').then(function (data) {
      data.forEach(element => {
          cy.get('#input').clear().type(element.command);
          cy.get('#search').click();
          cy.get('.suggested').should('contain.text', element.expected);
        })
      });
    })



})