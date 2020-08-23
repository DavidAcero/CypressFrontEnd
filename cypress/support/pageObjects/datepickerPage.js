function selectDayFromCurrent(day) {

    let date = new Date()
    date.setDate(date.getDate() + day)        
    let futureDay = date.getDate()
    let futureMonth = date.toLocaleString('default', {month: 'short'})
    let dateAssert = futureMonth + ' ' + futureDay+ ', ' + date.getFullYear()

    cy.get('nb-calendar-navigation')
        .invoke('attr', 'ng-reflect-date')
        .then(dateAttribute => {
            if(!dateAttribute.includes(futureMonth)){
                cy.get('[data-name="chevron-right"]').click()
                selectDayFromCurrent(day)
            } else{
                cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
            }
        })     
    return dateAssert
}

export class DatepickerPage{

    selectCommonDatePickerDateFromToday(dayFromToday) {
        cy.contains('nb-card', 'Common Datepicker')
            .find('input')
            .then(input => {
                cy.wrap(input).click()
                let testDate = selectDayFromCurrent(dayFromToday)

                cy.wrap(input)
                    .invoke('prop', 'value')
                    .should('contain', testDate)
            })
    }

    selectDatePickerWithRangeFromToday(firstDay, secondDay) {
        cy.contains('nb-card', 'Datepicker With Range')
            .find('input')
            .then(input => {
                cy.wrap(input).click()
                let testDateFirst = selectDayFromCurrent(firstDay)
                let testDateSecond = selectDayFromCurrent(secondDay)
                const finalDate = testDateFirst + ' - ' + testDateSecond
                cy.wrap(input)
                    .invoke('prop', 'value')
                    .should('contain', finalDate)
            })
    }
}

export const onDatePickerPage = new DatepickerPage()