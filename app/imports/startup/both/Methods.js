import { Meteor } from 'meteor/meteor';
import { Jams } from '../../api/jams/Jams';
import { Profiles } from '../../api/profiles/Profiles';
import { JamsInterests } from '../../api/jams/JamsInterests';

const updateProfileMethod = 'Profiles.update';

Meteor.methods({
  'Profiles.update'({ email, name, bio, picture, interests, instruments, jams }) {
    Profiles.update(
        { email },
        { $set: {
            email,
            name,
            bio,
            picture,
            interests,
            instruments,
            jams,
          },
        },
    );
  },
});

const addJamMethod = 'Jams.add';

Meteor.methods({
  'Jams.add'({ name, description, picture, interests, homepage, date }) {
    Jams.insert({ name, description, picture, homepage, date });
    interests.map((interest) => JamsInterests.insert({ jam: name, interest }));
  },
});

export { updateProfileMethod, addJamMethod };
