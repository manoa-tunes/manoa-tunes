import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

const jamsInterestsName = 'JamsInterests';
const JamsInterests = new Mongo.Collection(jamsInterestsName);

const JamInterestSchema = new SimpleSchema({
  jam: String,
  interest: String,
}, { tracker: Tracker });

JamsInterests.attachSchema(JamInterestSchema);

export { JamsInterests, JamInterestSchema, jamsInterestsName };
