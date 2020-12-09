import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesJams } from '../../api/profiles/ProfilesJams';
import { Jams } from '../../api/jams/Jams';
import { JamsInterests } from '../../api/jams/JamsInterests';
import { JamsInstruments } from '../../api/jams/JamsInstruments';
import JamsCard from '../components/JamsCard';

function getJamData(name) {
  const data = Jams.collection.findOne({ name });
  const interests = _.pluck(JamsInterests.collection.find({ jam: name }).fetch(), 'interest');
  const profiles = _.pluck(ProfilesJams.collection.find({ jam: name }).fetch(), 'profile');
  const instruments = _.pluck(JamsInstruments.collection.find({ jam: name }).fetch(), 'instrument');
  const profilePictures = profiles.map(profile => Profiles.collection.findOne({ email: profile }).picture);
  return _.extend({ }, data, { interests, instruments, participants: profilePictures });
}

/** Renders the Project Collection as a set of Cards. */
class JamsPage extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const jams = _.pluck(Jams.collection.find().fetch(), 'name');
    const jamData = jams.map(jam => getJamData(jam));
    return (
        <div className="bg-image">
          <Container id="jam-page">
            <Card.Group>
              {_.map(jamData, (jam, index) => <JamsCard key={index} jam={jam}/>)}
            </Card.Group>
          </Container>
        </div>
    );
  }
}

JamsPage.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(ProfilesJams.userPublicationName);
  const sub2 = Meteor.subscribe(Jams.userPublicationName);
  const sub3 = Meteor.subscribe(JamsInterests.userPublicationName);
  const sub4 = Meteor.subscribe(Profiles.userPublicationName);
  const sub5 = Meteor.subscribe(JamsInstruments.userPublicationName);
  return {
    ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready() && sub5.ready(),
  };
})(JamsPage);
