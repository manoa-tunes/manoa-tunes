import { Selector } from 'testcafe';

class ProfilesAdminPage {
  constructor() {
    this.pageId = '#profilesAdmin-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks that the current page has at least nine interests on it.  */
  async hasDefaultProfilesAdmin(testController) {
    const cardCount = Selector('.ui .card').count;
    await testController.expect(cardCount).gte(4);
  }
}

export const profilesAdminPage = new ProfilesAdminPage();
