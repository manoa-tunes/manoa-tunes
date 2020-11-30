import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

const instrumentsName = 'Instruments';
const Instruments = new Mongo.Collection(instrumentsName);

const InstrumentsSchema = new SimpleSchema({
  name: { type: String, index: true, unique: true },
}, { tracker: Tracker });

Instruments.attachSchema(InstrumentsSchema);

export { Instruments, InstrumentsSchema, instrumentsName };
