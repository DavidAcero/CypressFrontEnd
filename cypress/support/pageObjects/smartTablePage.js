
export class smartTable {

    updateAgeByFirstName(name, age){
        cy.get('tbody')
        .contains('tr', name)
        .then(tRow => {
            cy.wrap(tRow)
                .find('.nb-edit')
                .click()

            cy.wrap(tRow)
                .find('[placeholder="Age"]')
                .clear()
                .type(age)
            
            cy.wrap(tRow)
                .find('.nb-checkmark')
                .click()

            cy.wrap(tRow)
                .find('td')
                .eq(6)
                .should('contain', age)
        })
    }

    addNewRecordWithFirstAndLastName(firstName, lastName){
        cy.get('thead')
        .find('.nb-plus')
        .click()
    
        cy.get('thead')
        .find('tr')
        .eq(2)
        .then( tRow => {
            cy.wrap(tRow)
                .find('[placeholder="First Name"]')
                .type(firstName)

            cy.wrap(tRow)
                .find('[placeholder="Last Name"]')
                .type(lastName)
   
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
                .should('contain', firstName)

            cy.wrap(tColumn)
                .eq(3)
                .should('contain', lastName)
                
        })
    }

    deleteRowByIndex(index){
        const myStub = cy.stub()
        cy.on('window:confirm', myStub)
        cy.get('tbody tr').eq(index)
            .find('.nb-trash')
            .click()
            .then(() => {
                expect(myStub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
            })
    }
}

export const onSmartTablePage = new smartTable ()