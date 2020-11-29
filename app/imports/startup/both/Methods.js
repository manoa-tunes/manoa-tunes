import { Meteor } from 'meteor/meteor';
import { Jams } from '../../api/jams/Jams';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { ProfilesJams } from '../../api/profiles/ProfilesJams';
import { ProfilesInstruments } from '../../api/profiles/ProfilesInstruments';
import { JamsInterests } from '../../api/jams/JamsInterests';

const updateProfileMethod = 'Profiles.update';

/**
 * The server-side Profiles.update Meteor Method is called by the client-side Home page after pushing the update button.
 * Its purpose is to update the Profiles, ProfilesInterests, and ProfilesJams collections to reflect the
 * updated situation specified by the user.
 */
Meteor.methods({
  'Profiles.update'({ email, name, bio, picture, interests, instruments, jams }) {
    Profiles.collection.update({ email }, { $set: { email, name, bio, picture, interests, instruments, jams } });
    ProfilesInterests.collection.remove({ profile: email });
    ProfilesJams.collection.remove({ profile: email });
    ProfilesInstruments.collection.remove({ profile: email });
    interests.map((interest) => ProfilesInterests.collection.insert({ profile: email, interest }));
    jams.map((jam) => ProfilesJams.collection.insert({ profile: email, jam }));
  },
});

const addJamMethod = 'Jams.add';

/** Creates a new jam in the Jams collection, and also updates ProfilesJams and JamsInterests. */
Meteor.methods({
  'Jams.add'({ name, description, picture, interests, homepage }) {
    Jams.collection.insert({ name, description, picture, homepage });
    ProfilesJams.collection.remove({ jam: name });
    JamsInterests.collection.remove({ jam: name });
    if (interests) {
    interests.map((interest) => JamsInterests.collection.insert({ jam: name, interest }));
  } else {
    throw new Meteor.Error('At least one interest is required.');
  }
  },
});

export { updateProfileMethod, addJamMethod };
