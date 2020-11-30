import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

const jamsName = 'Jams';
const Jams = new Mongo.Collection(jamsName);

const JamSchema = new SimpleSchema({
  name: { type: String, index: true, unique: true },
  homepage: { type: String, optional: true },
  description: { type: String, optional: true },
  picture: { type: String, optional: true },
}, { tracker: Tracker });

Jams.attachSchema(JamSchema);

export { Jams, JamSchema, jamsName };
