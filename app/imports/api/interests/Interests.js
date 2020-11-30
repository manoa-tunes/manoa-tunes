import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

const interestsName = 'Interests';
const Interests = new Mongo.Collection(interestsName);

const InterestSchema = new SimpleSchema({
  name: { type: String, index: true, unique: true },
}, { tracker: Tracker });

Interests.attachSchema(InterestSchema);

export { Interests, InterestSchema, interestsName };
