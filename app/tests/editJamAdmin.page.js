import { Selector } from 'testcafe';

class EditJamAdminPage {
  constructor() {
    this.pageId = '#editJamAdmin-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Sets the location field to a new value, then checks that the update succeeded. */
  async setLocation(testController, location) {
    // Delete text from location field.
    await testController.selectText('#location').pressKey('delete');
    // Type in new location.
    await testController.typeText('#location', location);
    // Submit it.
    await testController.click('#editJamAdmin-page-submit');
    // Click the OK button on the Sweet Alert.
    await testController.click(Selector('.swal-button--confirm'));
    // Check that the field is updated.
    await testController.expect(Selector('#location').value).eql(location);
  }

  /** Checks that the current page has at least nine interests on it.  */
  async updateLocation(testController) {
    const newLocation = 'New Place';
    await this.isDisplayed(testController);
    // Delete text from location field.
    await testController.selectText('#location').pressKey('delete');
    // Type in new location.
    await testController.typeText('#location', newLocation);
    // Submit it.
    await testController.click('#editJamAdmin-page-submit');
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const editJamAdminPage = new EditJamAdminPage();
