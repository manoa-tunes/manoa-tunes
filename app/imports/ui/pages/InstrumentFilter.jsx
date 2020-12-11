import React from 'react';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Container, Loader, Card, Segment } from 'semantic-ui-react';
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
import ProfileCard from '../components/ProfileCard';

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allInstruments) => new SimpleSchema({
  instruments: { type: Array, label: 'Instruments', optional: true },
  'instruments.$': { type: String, allowedValues: allInstruments },
});

function getProfileData(email) {
  const data = Profiles.collection.findOne({ email });
  const interests = _.pluck(ProfilesInterests.collection.find({ profile: email }).fetch(), 'interest');
  const instruments = _.pluck(ProfilesInstruments.collection.find({ profile: email }).fetch(), 'instrument');
  const jams = _.pluck(ProfilesJams.collection.find({ profile: email }).fetch(), 'jam');
  // console.log(_.extend({ }, data, { interests, jams: jamPictures }));
  return _.extend({}, data, { interests, instruments, jams });
}

/** Renders the Profile Collection as a set of Cards. */
class InstrumentFilter extends React.Component {

  constructor(props) {
    super(props);
    this.state = { instruments: [] };
  }

  submit(data) {
    this.setState({ instruments: data.instruments || [] });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const allInstruments = _.pluck(Instruments.collection.find().fetch(), 'name');
    const formSchema = makeSchema(allInstruments);
    const bridge = new SimpleSchema2Bridge(formSchema);
    const emails = _.pluck(ProfilesInstruments.collection.find({ instrument: { $in: this.state.instruments } }).fetch(), 'profile');
    const profileData = _.uniq(emails).map(email => getProfileData(email));
    return (
        <div className="bg-color">
          <Container id="filter-page">
            <AutoForm schema={bridge} onSubmit={data => this.submit(data)} style={{ marginBottom: '20px' }}>
              <Segment>
                <MultiSelectField id='instruments' name='instruments' showInlineError={true} placeholder={'Instruments'}/>
                <SubmitField id='submit' value='Submit'/>
              </Segment>
            </AutoForm>
            <Card.Group style={{ paddingTop: '10px' }} itemsPerRow={4}>
              {_.map(profileData, (profile, index) => <ProfileCard key={index} profile={profile}/>)}
            </Card.Group>
          </Container>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
InstrumentFilter.propTypes = {
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
  const sub7 = Meteor.subscribe(ProfilesJams.userPublicationName);
  return {
    ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready() && sub5.ready() && sub6.ready() && sub7.ready(),
  };
})(InstrumentFilter);
