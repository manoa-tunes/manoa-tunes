import React from 'react';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Container, Loader, Card, Image, Label, Header, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { AutoForm, SubmitField } from 'uniforms-semantic';
import { Interests } from '../../api/interests/Interests';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { ProfilesInstruments } from '../../api/profiles/ProfilesInstruments';
import { Jams } from '../../api/jams/Jams';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import { Instruments } from '../../api/instruments/Instruments';
import { ProfilesJams } from '../../api/profiles/ProfilesJams';

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allInterests) => new SimpleSchema({
  interests: { type: Array, label: 'Interests', optional: true },
  'interests.$': { type: String, allowedValues: allInterests },
});

function getProfileData(email) {
  const data = Profiles.collection.findOne({ email });
  const interests = _.pluck(ProfilesInterests.collection.find({ profile: email }).fetch(), 'interest');
  const instruments = _.pluck(ProfilesInstruments.collection.find({ profile: email }).fetch(), 'instrument');
  const jams = _.pluck(ProfilesJams.collection.find({ profile: email }).fetch(), 'jam');
  // console.log(_.extend({ }, data, { interests, jams: jamPictures }));
  return _.extend({}, data, { interests, instruments, jams });
}

const whiteText = { color: 'white' };
/** Component for layout out a Profile Card. */
const MakeCard = (props) => (
    <Card>
      <Card.Content className="card-bg">
        <Image floated='right' size='mini' src={props.profile.picture}/>
        <Card.Header style={whiteText}>{props.profile.name}</Card.Header>
        <Card.Meta style={whiteText}>
          <span className='date'>{props.profile.email}</span>
        </Card.Meta>
        <Card.Description style={whiteText}>
          {props.profile.bio}
        </Card.Description>
      </Card.Content>
      <Card.Content extra className="card-bg">
        <Header as='h5' style={whiteText} className="card-header">Interests</Header>
        {_.map(props.profile.interests,
            (interest, index) => <Label key={index} size='tiny' color='black'>{interest}</Label>)}
      </Card.Content>
      <Card.Content extra className="card-bg">
        <Header as='h5' className="card-header" style={whiteText}>Instruments</Header>
        {_.map(props.profile.instruments,
            (instrument, index) => <Label key={index} size='tiny' color='black'>{instrument}</Label>)}
      </Card.Content>
      <Card.Content extra className="card-bg">
        <Header as='h5' className="card-header" style={whiteText}>Jams</Header>
        {_.map(props.profile.jams,
            (jam, index) => <Label key={index} size='tiny' color='green'>{jam}</Label>)}
      </Card.Content>
    </Card>
);

/** Properties */
MakeCard.propTypes = {
  profile: PropTypes.object.isRequired,
};

/** Renders the Profile Collection as a set of Cards. */
class Filter extends React.Component {

  constructor(props) {
    super(props);
    this.state = { interests: [] };
  }

  submit(data) {
    this.setState({ interests: data.interests || [] });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const allInterests = _.pluck(Interests.collection.find().fetch(), 'name');
    const formSchema = makeSchema(allInterests);
    const bridge = new SimpleSchema2Bridge(formSchema);
    const emails = _.pluck(ProfilesInterests.collection.find({ interest: { $in: this.state.interests } }).fetch(), 'profile');
    const profileData = _.uniq(emails).map(email => getProfileData(email));
    return (
        <Container id="filter-page">
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)} >
            <Segment>
              <MultiSelectField id='interests' name='interests' showInlineError={true} placeholder={'Interests'}/>
              <SubmitField id='submit' value='Submit'/>
            </Segment>
          </AutoForm>
          <Card.Group style={{ paddingTop: '10px' }}>
            {_.map(profileData, (profile, index) => <MakeCard key={index} profile={profile}/>)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Filter.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(Profiles.userPublicationName);
  const sub2 = Meteor.subscribe(ProfilesInterests.userPublicationName);
  const sub3 = Meteor.subscribe(ProfilesInstruments.userPublicationName);
  const sub4 = Meteor.subscribe(Jams.userPublicationName);
  const sub5 = Meteor.subscribe(Interests.userPublicationName);
  const sub6 = Meteor.subscribe(Instruments.userPublicationName);
  return {
    ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready() && sub5.ready() && sub6,
  };
})(Filter);
