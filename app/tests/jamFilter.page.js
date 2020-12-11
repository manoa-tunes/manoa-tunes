import { Selector } from 'testcafe';

class JamFilterPage {
  constructor() {
    this.pageId = '#jamFilter-page';
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
    const jamsSelector = Selector('#jams');
    const YessJazzOption = jamsSelector.find('#YessJazz');
    await testController.click(jamsSelector);
    await testController.click(YessJazzOption);
    await testController.click(jamsSelector);
    await testController.click('#jamFilter-submit');
  }
}

export const jamFilterPage = new JamFilterPage();
