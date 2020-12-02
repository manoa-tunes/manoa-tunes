import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Encapsulates state and variable values for this collection. */
class JamsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'JamsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: { type: String, index: true, unique: true },
      contact: { type: String, optional: true },
      date: { type: String, optional: true },
      location: { type: String, optional: true },
      interests: { type: Array, optional: true },
      'interests.$': { type: String },
      instruments: { type: Array, optional: true },
      'instruments.$': { type: String },
    }, { tracker: Tracker });
    // Ensure collection documents obey schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Jams = new JamsCollection();
