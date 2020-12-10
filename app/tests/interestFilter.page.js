import { Selector } from 'testcafe';

class InterestFilterPage {
  constructor() {
    this.pageId = '#interestFilter-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks this page is displayed, then checks that filtering works. */
  async filter(testController) {
    await this.isDisplayed(testController);
    // Select visualization and submit
    const interestsSelector = Selector('#interests');
    const popOption = interestsSelector.find('#Pop');
    await testController.click(interestsSelector);
    await testController.click(popOption);
    await testController.click(interestsSelector);
    await testController.click('#interestFilter-submit');
  }
}

export const interestFilterPage = new InterestFilterPage();
