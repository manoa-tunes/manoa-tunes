import { Selector } from 'testcafe';

class InstrumentFilterPage {
  constructor() {
    this.pageId = '#instrumentFilter-page';
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
    const instrumentsSelector = Selector('#instruments');
    const pianoOption = instrumentsSelector.find('#Piano');
    await testController.click(instrumentsSelector);
    await testController.click(pianoOption);
    await testController.click(instrumentsSelector);
    await testController.click('#instrumentFilter-submit');
  }
}

export const instrumentFilterPage = new InstrumentFilterPage();
