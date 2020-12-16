import { Meteor } from 'meteor/meteor';
import { Interests } from '../../api/interests/Interests';
import { Instruments } from '../../api/instruments/Instruments';
import { Jams } from '../../api/jams/Jams';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { ProfilesInstruments } from '../../api/profiles/ProfilesInstruments';
import { ProfilesJams } from '../../api/profiles/ProfilesJams';
import { JamsInterests } from '../../api/jams/JamsInterests';
import { JamsInstruments } from '../../api/jams/JamsInstruments';
import { Notes } from '../../api/note/Notes';

/** Define a publication to publish all interests. */
Meteor.publish(Interests.userPublicationName, () => Interests.collection.find());

Meteor.publish(Instruments.userPublicationName, () => Instruments.collection.find());

Meteor.publish(Jams.userPublicationName, () => Jams.collection.find());

Meteor.publish(JamsInterests.userPublicationName, () => JamsInterests.collection.find());

Meteor.publish(JamsInstruments.userPublicationName, () => JamsInstruments.collection.find());

Meteor.publish(Profiles.userPublicationName, () => Profiles.collection.find());

Meteor.publish(ProfilesInterests.userPublicationName, () => ProfilesInterests.collection.find());

Meteor.publish(ProfilesInstruments.userPublicationName, () => ProfilesInstruments.collection.find());

Meteor.publish(ProfilesJams.userPublicationName, () => ProfilesJams.collection.find());

Meteor.publish(Notes.userPublicationName, () => Notes.collection.find());

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
