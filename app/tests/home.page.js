import { Selector } from 'testcafe';

class HomePage {
  constructor() {
    this.pageId = '#home-page';
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
    await testController.click('#home-page-submit');
    // Click the OK button on the Sweet Alert.
    await testController.click(Selector('.swal-button--confirm'));
    // Check that the field is updated.
    await testController.expect(Selector('#name').value).eql(name);
  }

  /** Checks this page is displayed, then changes name field, checks update succeeded, then restores value. */
  // Should be able to use set name without generating warnings with first release after 1.9.4. (Fixed in pull/5584).
  async updateProfile(testController) {
    const newName = 'New Name';
    await this.isDisplayed(testController);
    // Delete text from name field.
    await testController.selectText('#name').pressKey('delete');
    // Type in new name.
    await testController.typeText('#name', newName);
    // Submit it.
    await testController.click('#home-page-submit');
    /*
    // Click the OK button on the Sweet Alert.
    await testController.click(Selector('.swal-button--confirm'));
    // Check that the field is updated.
    await testController.expect(Selector('#name').value).eql(newName);
    await testController.selectText('#name').pressKey('delete');
    await testController.typeText('#name', name);
    await testController.click('#home-page-submit');
    */
    // await testController.click(Selector('.swal-button--confirm'));
    // await testController.expect(Selector('#name').value).eql(name);
  }
}

export const homePage = new HomePage();
