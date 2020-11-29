import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Interests } from '../../api/interests/Interests';
import { Instruments } from '../../api/instruments/Instruments';
import { Jams } from '../../api/jams/Jams';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { ProfilesInstruments } from '../../api/profiles/ProfilesInstruments';
import { ProfilesJams } from '../../api/profiles/ProfilesJams';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

/** Initialize the collection if empty. */
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

function createUser(email, password, role) {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
  });
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
}

function addInterest(interest) {
  Interests.collection.update({ name: interest }, { $set: { name: interest } }, { upsert: true });
}

/** Initialize the collection if empty. */
if (Interests.collection.find().count() === 0) {
  if (Meteor.settings.defaultInterests) {
    console.log('Creating default data.');
    Meteor.settings.defaultInterests.map(data => addInterest(data));
  }
}

function addInstrument(instrument) {
  Instruments.collection.update({ name: instrument }, { $set: { name: instrument } }, { upsert: true });
}

/** Initialize the collection if empty. */
if (Instruments.collection.find().count() === 0) {
  if (Meteor.settings.defaultInstruments) {
    console.log('Creating default data.');
    Meteor.settings.defaultInstruments.map(data => addInstrument(data));
  }
}

function addJam(jam) {
  Jams.collection.update({ name: jam }, { $set: { name: jam } }, { upsert: true });
}

/** Initialize the collection if empty. */
if (Jams.collection.find().count() === 0) {
  if (Meteor.settings.defaultJams) {
    console.log('Creating default data.');
    Meteor.settings.defaultJams.map(data => addJam(data));
  }
}

function addProfile({ name, bio, interests, instruments, jams, picture, email, role }) {
  console.log(`Defining profile ${email}`);
  // Define the user in the Meteor accounts package.
  createUser(email, role);
  // Create the profile.
  Profiles.collection.insert({ name, bio, picture, email });
  // Add interests and projects.
  interests.map(interest => ProfilesInterests.collection.insert({ profile: email, interest }));
  instruments.map(instrument => ProfilesInstruments.collection.insert({ profile: email, instrument }));
  jams.map(jam => ProfilesJams.collection.insert({ profile: email, jam }));
  // Make sure interests are defined in the Interests collection if they weren't already.
  interests.map(interest => addInterest(interest));
  instruments.map(instrument => addInstrument(instrument));
  jams.map(jam => addJam(jam));
}

if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating the default profiles');
    Meteor.settings.defaultProfiles.map(profile => addProfile(profile));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}

if ((Meteor.settings.loadAssetsFile) && (Meteor.users.find().count() < 7)) {
  const assetsFileName = 'data.json';
  console.log(`Loading data from private/${assetsFileName}`);
  const jsonData = JSON.parse(Assets.getText(assetsFileName));
  jsonData.profiles.map(profile => addProfile(profile));
}
