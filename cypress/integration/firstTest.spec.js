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

    it("Invoke Command #2", () => {
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

    it("RadioButtons", () => {
        cy.visit('/')
        cy.contains('Forms').click()         
        cy.contains('Form Layout').click()

        cy.contains('nb-card', "Using the Grid")
            .find('[type="radio"]')
            .then(radioButtons => {
                cy.wrap(radioButtons)
                    .first() // eq(0)
                    .check({force: true})
                    .should('be.checked')
                
                cy.wrap(radioButtons)
                    .eq(1) // index 1
                    .check({force: true})
                
                cy.wrap(radioButtons)
                    .first()
                    .should('not.be.checked')

                cy.wrap(radioButtons)
                    .eq(2)
                    .should('be.disabled')
            })
    })

    it("Checkboxes", () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()         
        cy.contains('Toastr').click()

        cy.get("[type='checkbox']")
            .check({force: true})
            .uncheck({force: true})
        
        cy.get("[type='checkbox']")
            .eq(0)
            .click({force: true})
    })

    it("Dropdown", () => {
        cy.visit('/')
        // Selecting 1 item
        // cy.get('nav nb-select')
        //     .click()
        // cy.get('.options-list')
        //     .contains('Dark')
        //     .click()

        // cy.get('nav nb-select')
        //     .should('contain', 'Dark')

        // cy.get('nb-layout-header nav')
        //     .should('have.css', 'background-color', 'rgb(34, 43, 69)')

        // Looping per each
        cy.get('nav nb-select')
            .then(dropdown => {
                cy.wrap(dropdown).click()
                cy.get('.options-list nb-option')
                    .each( (listItem, index) => {
                        const itemText = listItem.text().trim()
                        const colors = {
                            "Light" : "rgb(255, 255, 255)",
                            "Dark" : "rgb(34, 43, 69)",
                            "Cosmic": "rgb(50, 50, 89)",
                            "Corporate" : "rgb(255, 255, 255)"
                        }

                        cy.wrap(listItem).click()
                        cy.wrap(dropdown)
                            .should('contain', itemText)
                        cy.get('nb-layout-header nav')
                            .should('have.css', 'background-color', colors[itemText])
                        
                        if( index < 3){
                            cy.wrap(dropdown).click()                 
                        }
                    })
            })
        
        // Also you can use cypress Select
    })

    it.only("Table #1", () => {

        cy.visit('/')
        cy.contains('Tables & Data').click()         
        cy.contains('Smart Table').click()

        // Edit Value and Verify it
        cy.get('tbody')
            .contains('tr', 'Larry')
            .then(tRow => {
                cy.wrap(tRow)
                    .find('.nb-edit')
                    .click()

                cy.wrap(tRow)
                    .find('[placeholder="Age"]')
                    .clear()
                    .type('25')
                
                cy.wrap(tRow)
                    .find('.nb-checkmark')
                    .click()

                cy.wrap(tRow)
                    .find('td')
                    .eq(6)
                    .should('contain', '25')
            })

        // Add user
        cy.get('thead')
            .find('.nb-plus')
            .click()
        
        cy.get('thead')
            .find('tr')
            .eq(2)
            .then( tRow => {
                cy.wrap(tRow)
                    .find('[placeholder="First Name"]')
                    .type('David')

                cy.wrap(tRow)
                    .find('[placeholder="Last Name"]')
                    .type('Acero')
       
                cy.wrap(tRow)
                    .find('.nb-checkmark')
                    .click()
            })
        
        cy.get('tbody tr')
            .first()
            .find('td')
            .then(tColumn => {
                cy.wrap(tColumn)
                    .eq(2)
                    .should('contain', 'David')

                cy.wrap(tColumn)
                    .eq(3)
                    .should('contain', 'Acero')
                    
            })

        // Verify Search Tab
        const age = [20, 30, 40, 200]

        cy.wrap(age).each(age => {
            cy.get('thead [placeholder="Age"]')
                .clear()
                .type(age)
                .wait(500)
        
            cy.get('tbody tr')
                .each(tRow => {
                    if(age == 200){
                        cy.wrap(tRow)
                            .should('contain', 'No data found')
                    } else{
                        cy.wrap(tRow)
                            .find('td')
                            .eq(6)
                            .should('contain', age)
                    }
            })
        })
    })
})