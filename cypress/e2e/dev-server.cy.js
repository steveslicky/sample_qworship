describe('test dev server', () => {

  it('passes', function () {
    cy.visit('https://sowlab.tech/eWorship/')
    cy.fixture('example').then(function (data) {
      data.forEach(element => {
          cy.get('#input').clear().type(element.command);
          cy.get('#search').click();
          cy.get('.suggested').should('contain.text', element.expected);
        })
      });
  })



})