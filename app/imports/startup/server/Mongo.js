import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Interests } from '../../api/interests/Interests';
import { Instruments } from '../../api/instruments/Instruments';
import { Jams } from '../../api/jams/Jams';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { ProfilesInstruments } from '../../api/profiles/ProfilesInstruments';
import { ProfilesJams } from '../../api/profiles/ProfilesJams';
import { JamsInterests } from '../../api/jams/JamsInterests';
import { JamsInstruments } from '../../api/jams/JamsInstruments';

/* eslint-disable no-console */

function createUser(email, role) {
  const userID = Accounts.createUser({ username: email, email, password: 'foo' });
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
    console.log('Creating default instruments.');
    Meteor.settings.defaultInstruments.map(data => addInstrument(data));
  }
}

function addJam({ name, contact, date, location, interests, instruments }) {
  console.log(`Defining jam ${name}`);
  Jams.collection.insert({ name, contact, date, location });
  interests.map(interest => JamsInterests.collection.insert({ jam: name, interest }));
  instruments.map(instrument => JamsInstruments.collection.insert({ jam: name, instrument }));
  interests.map(interest => addInterest(interest));
  instruments.map(instrument => addInstrument(instrument));
}

/** Initialize the collection if empty. */
if (Jams.collection.find().count() === 0) {
  if (Meteor.settings.defaultJams) {
    console.log('Creating default jams.');
    Meteor.settings.defaultJams.map(jam => addJam(jam));
  }
}

function addProfile({ name, bio, interests, instruments, jams, picture, email, role }) {
  console.log(`Defining profile ${email}`);
  Profiles.collection.insert({ name, bio, picture, email });
  // Add interests and projects.
  createUser(email, role);
  interests.map(interest => ProfilesInterests.collection.insert({ profile: email, interest }));
  instruments.map(instrument => ProfilesInstruments.collection.insert({ profile: email, instrument }));
  jams.map(jam => ProfilesJams.collection.insert({ profile: email, jam }));
  // Make sure interests are defined in the Interests collection if they weren't already.
  interests.map(interest => addInterest(interest));
  instruments.map(instrument => addInstrument(instrument));
}

/** Initialize the collection if empty. */
if (Profiles.collection.find().count() === 0) {
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
  jsonData.jams.map(jam => addJam(jam));
}
