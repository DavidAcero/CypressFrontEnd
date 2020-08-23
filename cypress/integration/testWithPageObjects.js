const { navigateTo } = require("../support/pageObjects/navigationPage")
const { onFormLayoutPage } = require("../support/pageObjects/formLayoutPage")
const { onDatePickerPage } = require("../support/pageObjects/datepickerPage")
const { onSmartTablePage } = require("../support/pageObjects/smartTablePage")

describe("Test With Page Objects", () => {


    beforeEach('Open Application', () => {
        cy.openHomePage()
    })

    it('Verify Navigation Across Pages', () => {
       navigateTo.formLayoutsPage()
       navigateTo.datepickerPage()
       navigateTo.smartTablePage()
       navigateTo.toastrPage()
       navigateTo.tooltipPage()
    })

    it.only('should submit Inline and Basic form and select tomorrow date in calendar', () => {
        navigateTo.formLayoutsPage()
        onFormLayoutPage.submitInlineFormWithNameAndEmail('testName', 'test@test.com')
        onFormLayoutPage.submitBasicFormWithEmailAndPassword('test@test.com', 'password')
        navigateTo.datepickerPage()
        onDatePickerPage.selectCommonDatePickerDateFromToday(4)
        onDatePickerPage.selectDatePickerWithRangeFromToday(7, 14)
        navigateTo.smartTablePage()
        onSmartTablePage.addNewRecordWithFirstAndLastName('David', 'Acero')
        onSmartTablePage.updateAgeByFirstName('David',20)
        onSmartTablePage.deleteRowByIndex(1)
    })

})