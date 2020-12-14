import { Selector } from 'testcafe';

class YourProfilePage {
  constructor() {
    this.pageId = '#yourProfile-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks that the current page has at least nine interests on it.  */
  /*
  async hasDefaultYourProfile(testController) {
    const cardCount = Selector('.ui .card').count;
    await testController.expect(cardCount).gte(1);
    await testController.click('#editProfile');
    await testController.click(Selector('.swal-button--confirm'));
  }
   */
  async yourProfile(testController) {
    await this.isDisplayed(testController);

    await testController.click('#editProfile');
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const yourProfilePage = new YourProfilePage();
