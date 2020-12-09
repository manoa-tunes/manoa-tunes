import { Selector } from 'testcafe';

class CreateProfilePage {
  constructor() {
    this.pageId = '#createProfile-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Sets the first name field to a new value, then checks that the update succeeded. */

  async setName(testController) {
    const name = 'Name';
    const bio = 'Introduce';
    await this.isDisplayed(testController);
    // Type in new name.
    await testController.typeText('#name', name);
    // Type in new bio.
    await testController.typeText('#bio', bio);
// Select interests.
    const interestsSelector = Selector('#interests');
    const popOption = interestsSelector.find('#Pop');
    await testController.click(interestsSelector);
    await testController.click(popOption);
    await testController.click(interestsSelector);

    // Select instruments.
    const instrumentsSelector = Selector('#instruments');
    const pianoOption = instrumentsSelector.find('#Piano');
    await testController.click(instrumentsSelector);
    await testController.click(pianoOption);
    await testController.click(instrumentsSelector);
    // Submit it.
    await testController.click('#createProfile-page-submit');
    // Click the OK button on the Sweet Alert.
    // meteor npm run start
    // await testController.click(Selector('.swal-button--confirm'));
    // Check that the field is updated.
    // await testController.expect(Selector('#name').value).eql(name);
  }
}

export const createProfilePage = new CreateProfilePage();
