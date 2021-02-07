/// <reference types="cypress" />

context("Tests", () => {
    beforeEach(()=>{
        cy.visit("http://localhost:3000")
    })

    it('opens accordians', () => {
        cy.get('.collapsible-div-header').each(
                (element) => {
                    cy.wrap(element).click()
                }
        );
        cy.get('.collapsible-div-content:first').should('have.class','hidden')
        cy.get('.collapsible-div-content:not(:first)').each(
            (element) => {
                expect(element).to.not.have.class("hidden")
            }
        )
        
    })


})