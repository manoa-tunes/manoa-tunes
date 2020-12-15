import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { signupPage } from './signup.page';
import { navBar } from './navbar.component';
import { yourProfilePage } from './yourProfile.page';
// import { homePage } from './home.page';
import { createProfilePage } from './createProfile.page';
import { profilesPage } from './profiles.page';
import { jamsPage } from './jams.page';
import { addJamPage } from './addJam.page';
import { jamsAdminPage } from './jamsAdmin.page';
import { profilesAdminPage } from './profilesAdmin.page';
import { editProfileAdminPage } from './editProfileAdmin.page';
import { editJamAdminPage } from './editJamAdmin.page';
import { instrumentFilterPage } from './instrumentFilter.page';
import { interestFilterPage } from './interestFilter.page';
import { jamFilterPage } from './jamFilter.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', admin: 'admin@foo.com', password: 'changeme' };

fixture('meteor-application-template-react localhost test with default db')
    .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that signup page, then logout works', async (testController) => {
  const newUser = `user-${new Date().getTime()}@foo.com`;
  await navBar.gotoSignupPage(testController);
  await signupPage.isDisplayed(testController);
  await signupPage.signupUser(testController, newUser, credentials.password);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that yourProfile page displays', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoYourProfilePage(testController);
  await yourProfilePage.isDisplayed(testController);
  // await yourProfilePage.hasDefaultYourProfile(testController);
  await navBar.ensureLogout(testController);
});

test('Test that creatProfile page works', async (testController) => {
  await navBar.ensureLogout(testController);
  const newUser = `user-${new Date().getTime()}@foo.com`;
  await navBar.gotoSignupPage(testController);
  await signupPage.isDisplayed(testController);
  await signupPage.signupUser(testController, newUser, credentials.username, credentials.password);
  // await navBar.gotoCreateProfilePage(testController);
  await createProfilePage.isDisplayed(testController);
  await createProfilePage.setName(testController);
});

test('Test that home page works', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoYourProfilePage(testController);
  await yourProfilePage.isDisplayed(testController);
  await yourProfilePage.yourProfile(testController);
  await navBar.ensureLogout(testController);
});

test('Test that profiles page displays', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoProfilesPage(testController);
  await profilesPage.isDisplayed(testController);
  // await profilesPage.hasDefaultProfiles(testController);
  await navBar.ensureLogout(testController);
});

test('Test that interestFilter page works', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoInterestFilterPage(testController);
  await interestFilterPage.isDisplayed(testController);
  await interestFilterPage.filter(testController);
});

test('Test that instrumentFilter page works', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoInstrumentFilterPage(testController);
  await instrumentFilterPage.isDisplayed(testController);
  await instrumentFilterPage.filter(testController);
});

test('Test that jamFilter page works', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoJamFilterPage(testController);
  await jamFilterPage.isDisplayed(testController);
  await jamFilterPage.filter(testController);
});

test('Test that addJam page works', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoAddJamPage(testController);
  await addJamPage.isDisplayed(testController);
  await addJamPage.addJam(testController);
  await navBar.ensureLogout(testController);
});

test('Test that jams page works', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoJamsPage(testController);
  await jamsPage.isDisplayed(testController);
  await jamsPage.jamsJoin(testController);
  await navBar.ensureLogout(testController);
});

test('Test that jamsAdmin page works', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.admin, credentials.password);
  await navBar.gotoJamsAdminPage(testController);
  await jamsAdminPage.isDisplayed(testController);
  await jamsAdminPage.hasDefaultJamsAdmin(testController);
  await navBar.ensureLogout(testController);
});

test('Test that profilesAdmin page displays', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.admin, credentials.password);
  await navBar.gotoProfilesAdminPage(testController);
  await profilesAdminPage.isDisplayed(testController);
  await profilesAdminPage.hasDefaultProfilesAdmin(testController);
  await navBar.ensureLogout(testController);
});

test('Test that editProfileAdmin page works', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.admin, credentials.password);
  await navBar.gotoEditProfileAdminPage(testController);
  await editProfileAdminPage.isDisplayed(testController);
  await editProfileAdminPage.updateProfile(testController, credentials.name);
  // await editProfileAdminPage.hasDefaultEditProfileAdmin(testController);
  await navBar.ensureLogout(testController);
});

test('Test that editJamAdmin page works', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.admin, credentials.password);
  await navBar.gotoEditJamAdminPage(testController);
  await editJamAdminPage.isDisplayed(testController);
  await editJamAdminPage.updateLocation(testController, credentials.location);
  // await editProfileAdminPage.hasDefaultEditProfileAdmin(testController);
  await navBar.ensureLogout(testController);
});
