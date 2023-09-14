describe('empty spec', () => {

  it('passes', function () {
    cy.visit('http://127.0.0.1:5500/');
    /* cy.fixture('manualload').then(function (data) {
      data.forEach(element => {
        setInterval(() => {
          const synth = window.speechSynthesis;
          const utterThis = new SpeechSynthesisUtterance(element.command);
          synth.speak(utterThis);
        }, 15000)
      })
    })
 */


    /* // individual
    cy.get("#typeahead-version").clear().type("NIV")
    cy.get(".tt-open > .tt-dataset > .tt-suggestion").contains("NIV").click()

    cy.get("#typeahead-book").clear().type("Luke")
    cy.get(".tt-open > .tt-dataset > .tt-suggestion").contains("Luke").click()

    cy.get("#typeahead-chapter").clear().type("3")
    cy.get(".tt-open > .tt-dataset > .tt-suggestion").contains("3").click()

    cy.get("#typeahead-verse").clear().type("16")
    cy.get(".tt-open > .tt-dataset > .tt-suggestion").contains("16").click()

    const randInd = Math.floor(Math.random() * 4)

    cy.wait(1000)
    cy.get('.controllIcons').each(($el, i) => {
      if (i == randInd) {
        if (!$el.hasClass("d-none")) {
          cy.wrap($el).click({ force: true })
          cy.wait(1000)
          if ($el.hasClass("bi-skip-backward-circle")) {
            let tempText = `${element.version} ${element.book} CHAPTER ${Number(element.chapter) - 1} VERSE ${element.verse}`;
            tempText = tempText.toUpperCase();
            cy.get('.suggested').should('contain.text', tempText);
          }
          else if ($el.hasClass("bi-skip-start-circle")) {
            let tempText = `${element.version} ${element.book} CHAPTER ${element.chapter} VERSE ${Number(element.verse) - 1}`;
            tempText = tempText.toUpperCase();
            cy.get('.suggested').should('contain.text', tempText);
          }
          else if ($el.hasClass("bi-skip-end-circle")) {
            let tempText = `${element.version} ${element.book} CHAPTER ${element.chapter} VERSE ${Number(element.verse) + 1}`;
            tempText = tempText.toUpperCase();
            cy.get('.suggested').should('contain.text', tempText);
          }
          else if ($el.hasClass("bi-skip-forward-circle")) {
            let tempText = `${element.version} ${element.book} CHAPTER ${Number(element.chapter) + 1} VERSE ${element.verse}`;
            tempText = tempText.toUpperCase();
            cy.get('.suggested').should('contain.text', tempText);
          }
        }
      }
    }) */

    /* cy.fixture('manualload').then(function (data) {
      data.forEach(element => {
        cy.get("#typeahead-version").clear().type(element.version)
        cy.get(".tt-open > .tt-dataset > .tt-suggestion").contains(element.version).click()

        cy.get("#typeahead-book").clear().type(element.book)
        cy.get(".tt-open > .tt-dataset > .tt-suggestion").contains(element.book).click()

        cy.get("#typeahead-chapter").clear().type(element.chapter)
        cy.get(".tt-open > .tt-dataset > .tt-suggestion").contains(element.chapter).click()

        cy.get("#typeahead-verse").clear().type(element.verse)
        cy.get(".tt-open > .tt-dataset > .tt-suggestion").contains(element.verse).click()

        cy.get('.suggested').should('contain.text', element.command);

        const randInd = Math.floor(Math.random() * 4)
        
        cy.wait(1000)
        cy.get('.controllIcons').each(($el, i) => {
          if (i == randInd) {
            if (!$el.hasClass("d-none")) {
              cy.wrap($el).click({ force: true })
              cy.wait(1000)
              if ($el.hasClass("bi-skip-backward-circle")) {
                let tempText = `${element.version} ${element.book} CHAPTER ${Number(element.chapter) - 1} VERSE ${element.verse}`;
                tempText = tempText.toUpperCase();
                cy.get('.suggested').should('contain.text', tempText);
              }
              else if ($el.hasClass("bi-skip-start-circle")) {
                let tempText = `${element.version} ${element.book} CHAPTER ${element.chapter} VERSE ${Number(element.verse) - 1}`;
                tempText = tempText.toUpperCase();
                cy.get('.suggested').should('contain.text', tempText);
              }
              else if ($el.hasClass("bi-skip-end-circle")) {
                let tempText = `${element.version} ${element.book} CHAPTER ${element.chapter} VERSE ${Number(element.verse) + 1}`;
                tempText = tempText.toUpperCase();
                cy.get('.suggested').should('contain.text', tempText);
              }
              else if ($el.hasClass("bi-skip-forward-circle")) {
                let tempText = `${element.version} ${element.book} CHAPTER ${Number(element.chapter) + 1} VERSE ${element.verse}`;
                tempText = tempText.toUpperCase();
                cy.get('.suggested').should('contain.text', tempText);
              }
            }
          }
        })
      })
    }); */

  })



})