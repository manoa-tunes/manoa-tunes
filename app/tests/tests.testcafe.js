import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { signupPage } from './signup.page';
import { navBar } from './navbar.component';
import { homePage } from './home.page';
import { createProfilePage } from './createProfile.page';
import { profilesPage } from './profiles.page';
import { jamsPage } from './jams.page';
import { addJamPage } from './addjam.page';
import { jamsAdminPage } from './jamsAdmin.page';

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
  // Create a new user email address that's guaranteed to be unique.
  const newUser = `user-${new Date().getTime()}@foo.com`;
  await navBar.gotoSignupPage(testController);
  await signupPage.isDisplayed(testController);
  await signupPage.signupUser(testController, newUser, credentials.password);
  // New user has successfully logged in, so now let's logout.
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that home page display', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoHomePage(testController);
  await homePage.isDisplayed(testController);
  await homePage.updateProfile(testController, credentials.name);
  // await navBar.ensureLogout(testController);
});

test('Test that create profiles page works', async (testController) => {
  await navBar.ensureLogout(testController);
  const newUser = `user-${new Date().getTime()}@foo.com`;
  await navBar.gotoSignupPage(testController);
  await signupPage.isDisplayed(testController);
  await signupPage.signupUser(testController, newUser, credentials.username, credentials.password);
  // await navBar.gotoCreateProfilePage(testController);
  await createProfilePage.isDisplayed(testController);
  await createProfilePage.setName(testController);
});

test('Test that profile page displays', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoProfilesPage(testController);
  await profilesPage.isDisplayed(testController);
  await profilesPage.hasDefaultProfiles(testController);
});

test('Test that addJam page works', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoAddJamPage(testController);
  await addJamPage.isDisplayed(testController);
  await addJamPage.addJam(testController);
});

test('Test that jams page displays', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoJamsPage(testController);
  await jamsPage.isDisplayed(testController);
  await jamsPage.hasDefaultJams(testController);
  await navBar.ensureLogout(testController);
});

test.only('Test that jamsAdmin page displays', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.admin, credentials.password);
  await navBar.gotoJamsAdminPage(testController);
  await jamsAdminPage.isDisplayed(testController);
  await jamsAdminPage.hasDefaultJamsAdmin(testController);
  await navBar.ensureLogout(testController);
});
