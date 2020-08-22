/// <reference types="cypress" />

describe("First Test Suite", () => {

    it("Locators Test", () => {

        cy.visit('/')
        cy.contains('Forms').click()         
        cy.contains('Form Layouts').click()

        // by Tag Name
        cy.get('input')

        // by Id
        cy.get('#inputEmail1')

        // by Class Name
        cy.get('.input-full-width')

        // by Attribute Name
        cy.get('[placeholder]')

        // by Attribute Name and Value
        cy.get('[placeholder="Email"]')

        // by Class Value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        // by Tag Name and Attribute 
        cy.get('input[placeholder="Email"]' )

        // by Two Different Attribute 
        cy.get('[placeholder="Email"][type="email"]' )

        // by Tag Name and Attribute with Value, Id and Class Name
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        // most Recommended Way
        cy.get('[data-cy="imputEmail1"]')
    })

    it("Web Elements Test", () => {

        cy.visit('/')
        cy.contains('Forms').click()         
        cy.contains('Form Layouts').click()

        cy.get('[data-cy="signInButton1"]')

        // FindByText
        cy.contains('Sign in')

        // Find Element with the following attribute and that contains 'Sign in'
        cy.contains('[status="warning"]','Sign in') 


        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click()

        cy.contains('nb-card', 'Horizontal form')
            .find('[placeholder="Email"]')

    })

    it("Then and Wrap Methods", () => {
        cy.visit('/')
        cy.contains('Forms').click()         
        cy.contains('Form Layouts').click()

        // Scenario: Verify Label Tags of 'Using Grid and Basic form'
        cy.contains('nb-card', 'Using the Grid').then (firstForm => {
            const email1 = firstForm.find('[for=inputEmail1]').text()
            const pass1  = firstForm.find('[for=inputPassword2]').text()
            expect(email1).to.equal('Email')
            expect(pass1).to.equal('Password')
        })

        cy.contains('nb-card', 'Basic form').then (secondForm => {
            const email2 = secondForm.find('[for=exampleInputEmail1]').text()
            const pass2  = secondForm.find('[for=exampleInputPassword1]').text()
            expect(email2).to.equal('Email address')
            expect(pass2).to.equal('Password')

            cy.wrap(secondForm).find('[for=exampleInputEmail1]').should('contain', 'Email address')
        })
    })

    it("Invoke Command #1", () => {
        cy.visit('/')
        cy.contains('Forms').click()         
        cy.contains('Form Layouts').click()

        // Example 1: Getting Text
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(label => {
            expect(label).to.equal('Email address')
        })

        // Example 2: Getting Attribute Value
        cy.contains('nb-card', 'Basic form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            .invoke('attr', 'class')
            .should('contain', 'checked')

        
    })

    it.only("Invoke Command #2", () => {
        cy.visit('/')
        cy.contains('Forms').click()         
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker')
            .find('input')
            .then(input => {
                cy.wrap(input)
                    .click()
                cy.get('nb-calendar-day-picker')
                    .contains('25')
                    .click()
                cy.wrap(input)
                    .invoke('prop', 'value')
                    .should('contain', 'Aug 25, 2020')
            })

        
    })
})