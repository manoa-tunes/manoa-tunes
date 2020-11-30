import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

const profilesName = 'Profiles';
const Profiles = new Mongo.Collection(profilesName);

const ProfileSchema = new SimpleSchema({
  email: { type: String, index: true, unique: true },
  name: { type: String, optional: true },
  bio: { type: String, optional: true },
  picture: { type: String, optional: true },
  interests: { type: Array, optional: true },
  'interests.$': { type: String },
  instruments: { type: Array, optional: true },
  'instruments.$': { type: String },
  jams: { type: Array, optional: true },
  'jams.$': { type: String },
}, { tracker: Tracker });

Profiles.attachSchema(ProfileSchema);

export { Profiles, ProfileSchema, profilesName };
