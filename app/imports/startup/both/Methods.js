import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Jams } from '../../api/jams/Jams';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { ProfilesJams } from '../../api/profiles/ProfilesJams';
import { ProfilesInstruments } from '../../api/profiles/ProfilesInstruments';
import { JamsInterests } from '../../api/jams/JamsInterests';
import { JamsInstruments } from '../../api/jams/JamsInstruments';

const updateProfileMethod = 'Profiles.update';

/**
 * The server-side Profiles.update Meteor Method is called by the client-side Home page after pushing the update button.
 * Its purpose is to update the Profiles, ProfilesInterests, and ProfilesJams collections to reflect the
 * updated situation specified by the user.
 */
Meteor.methods({
  'Profiles.update'({ email, name, bio, picture, interests, instruments, jams }) {
    Profiles.collection.update({ email }, { $set: { email, name, bio, picture } });
    ProfilesInterests.collection.remove({ profile: email });
    ProfilesJams.collection.remove({ profile: email });
    ProfilesInstruments.collection.remove({ profile: email });
    interests.map((interest) => ProfilesInterests.collection.insert({ profile: email, interest }));
    instruments.map((instrument) => ProfilesInstruments.collection.insert({ profile: email, instrument }));
    jams.map((jam) => ProfilesJams.collection.insert({ profile: email, jam }));
  },
});

const addJamMethod = 'Jams.add';

/** Creates a new jam in the Jams collection, and also updates ProfilesJams and JamsInterests. */
Meteor.methods({
  'Jams.add'({ name, contact, date, location, interests, instruments, participants }) {
    Jams.collection.insert({ name, contact, date, location });
    JamsInterests.collection.remove({ jam: name });
    JamsInstruments.collection.remove({ jam: name });
    if (interests) {
    interests.map((interest) => JamsInterests.collection.insert({ jam: name, interest }));
  } else {
    throw new Meteor.Error('At least one interest is required.');
  }
    if (instruments) {
      instruments.map((instrument) => JamsInstruments.collection.insert({ jam: name, instrument }));
    } else {
      throw new Meteor.Error('At least one interest is required.');
    }
    if (participants) {
      participants.map((participant) => ProfilesJams.collection.insert({ jam: name, profile: participant }));
    }
    if (_.contains(Jams.collection, contact)) {
      throw new Meteor.Error('You are already hosting a Jam.');
    }
  },
});

const updateJamMethod = 'Jams.update';

Meteor.methods({
  'Jams.update'({ name, contact, date, location, interests, instruments, participants }) {
    Jams.collection.update({ name }, { $set: { name, contact, date, location, participants } });
    JamsInstruments.collection.remove({ jam: name });
    JamsInterests.collection.remove({ jam: name });
    ProfilesJams.collection.remove({ jam: name });
    interests.map((interest) => JamsInterests.collection.insert({ jam: name, interest }));
    instruments.map((instrument) => JamsInstruments.collection.insert({ jam: name, instrument }));
    participants.map((participant) => ProfilesJams.collection.insert({ profile: participant, jam: name }));
  },
});

export { updateProfileMethod, addJamMethod, updateJamMethod };
