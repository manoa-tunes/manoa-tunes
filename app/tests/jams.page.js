import { Selector } from 'testcafe';

class JamsPage {
  constructor() {
    this.pageId = '#jams-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks that the current page has at least nine interests on it.  */
  async hasDefaultJams(testController) {
    const cardCount = Selector('.ui .card').count;
    await testController.expect(cardCount).gte(4);
  }
}

export const jamsPage = new JamsPage();
