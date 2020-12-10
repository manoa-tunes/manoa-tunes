import { Selector } from 'testcafe';

class AddJamPage {
  constructor() {
    this.pageId = '#add-jam-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks this page is displayed, then adds a new jam */
  async addJam(testController) {
    const name = 'Name Of Your Jam';
    const contact = 'Contact Information';
    const date = 'date & time';
    const location = 'location';
    await this.isDisplayed(testController);
    // Define the new jam
    await testController.typeText('#name', name);
    await testController.typeText('#contact', contact);
    await testController.typeText('#date', date);
    await testController.typeText('#location', location);

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
/*
    // Select participants.
    const participantsSelector = Selector('#participants');
    const huimOption = participantsSelector.find('#huim@hawaii.edu');
    await testController.click(participantsSelector);
    await testController.click(huimOption);
    await testController.click(participantsSelector);
*/
    await testController.click('#submit');
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const addJamPage = new AddJamPage();
