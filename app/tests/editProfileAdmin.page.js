import { Selector } from 'testcafe';

class EditProfileAdminPage {
  constructor() {
    this.pageId = '#editProfileAdmin-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Sets the name field to a new value, then checks that the update succeeded. */
  async setName(testController, name) {
    // Delete text from name field.
    await testController.selectText('#name').pressKey('delete');
    // Type in new name.
    await testController.typeText('#name', name);
    // Submit it.
    await testController.click('#editProfileAdmin-page-submit');
    // Click the OK button on the Sweet Alert.
    await testController.click(Selector('.swal-button--confirm'));
    // Check that the field is updated.
    await testController.expect(Selector('#name').value).eql(name);
  }

  /** Checks that the current page has at least nine interests on it.  */
  async updateProfile(testController) {
    const newName = 'New Name';
    await this.isDisplayed(testController);
    // Delete text from name field.
    await testController.selectText('#name').pressKey('delete');
    // Type in new name.
    await testController.typeText('#name', newName);
    // Submit it.
    await testController.click('#editProfileAdmin-page-submit');
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const editProfileAdminPage = new EditProfileAdminPage();
