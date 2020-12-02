import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Image, Label, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesJams } from '../../api/profiles/ProfilesJams';
import { Jams } from '../../api/jams/Jams';
import { JamsInterests } from '../../api/jams/JamsInterests';
import { JamsInstruments } from '../../api/jams/JamsInstruments';

function getJamData(name) {
  const data = Jams.collection.findOne({ name });
  const interests = _.pluck(JamsInterests.collection.find({ jam: name }).fetch(), 'interest');
  const profiles = _.pluck(ProfilesJams.collection.find({ profile: name }).fetch(), 'profile');
  const instruments = _.pluck(JamsInstruments.collection.find({ jam: name }).fetch(), 'instrument');
  const profilePictures = profiles.map(profile => Profiles.collection.findOne({ email: profile }).picture);
  return _.extend({ }, data, { interests, instruments, participants: profilePictures });
}

const MakeCard = (props) => (
    <Card>
      <Card.Content>
        <Card.Header style={{ marginTop: '0px' }}>{props.jam.name}</Card.Header>
        <Card.Description>
          <span className='date'>Contact Information: {props.jam.contact}</span>
        </Card.Description>
        <Card.Description>
          <span className='date'>Location: {props.jam.location}</span>
        </Card.Description>
        <Card.Description>
          <span className='date'>Date: {props.jam.date}</span>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Header as='h5'>Interests</Header>
        {_.map(props.jam.interests,
            (interest, index) => <Label key={index} size='tiny' color='teal'>{interest}</Label>)}
      </Card.Content>
      <Card.Content extra>
        <Header as='h5'>Instruments</Header>
        {_.map(props.jam.instruments,
            (instruments, index) => <Label key={index} size='tiny' color='teal'>{instruments}</Label>)}
      </Card.Content>
      <Card.Content extra>
        <Header as='h5'>Participants</Header>
        {_.map(props.jam.participants, (p, index) => <Image key={index} circular size='mini' src={p}/>)}
      </Card.Content>
    </Card>
);

MakeCard.propTypes = {
  jam: PropTypes.object.isRequired,
};

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
        <Container id="jam-page">
          <Card.Group>
            {_.map(jamData, (jam, index) => <MakeCard key={index} jam={jam}/>)}
          </Card.Group>
        </Container>
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
