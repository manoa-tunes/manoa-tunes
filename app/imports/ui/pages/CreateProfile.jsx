import React from 'react';
import { Grid, Segment, Header, Form, Loader } from 'semantic-ui-react';
import { AutoForm, TextField, LongTextField, SubmitField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import { Interests } from '../../api/interests/Interests';
import { Instruments } from '../../api/instruments/Instruments';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { ProfilesJams } from '../../api/profiles/ProfilesJams';
import { Jams } from '../../api/jams/Jams';
import { ProfilesInstruments } from '../../api/profiles/ProfilesInstruments';

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allInterests, allJams, allInstruments) => new SimpleSchema({
  email: { type: String, label: 'Email', optional: true },
  name: { type: String, label: 'Name', optional: true },
  bio: { type: String, label: 'Introduce & Goals', optional: true },
  picture: { type: String, label: 'Picture URL', optional: true },
  interests: { type: Array, label: 'Interests', optional: true },
  'interests.$': { type: String, allowedValues: allInterests },
  instruments: { type: Array, label: 'Instruments', optional: true },
  'instruments.$': { type: String, allowedValues: allInstruments },
  jams: { type: Array, label: 'Jams', optional: true },
  'jams.$': { type: String, allowedValues: allJams },
});

/** Renders the createProfile Page: what appears after the user logs in. */
class CreateProfile extends React.Component {
  /** Redirecting. */
  handleClick = () => {
    // eslint-disable-next-line
    document.location.href = '/';
  }

  submit(data) {
    const { name, bio, interests, instruments } = data;
    const email = Meteor.user().username;
    const picture = 'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg';
    const jams = [''];
    interests.map((interest) => ProfilesInterests.collection.insert({ profile: email, interest }));
    instruments.map((instrument) => ProfilesInstruments.collection.insert({ profile: email, instrument }));
    jams.map((jam) => ProfilesJams.collection.insert({ profile: email, jam }));
    Profiles.collection.insert({ name, email, bio, picture, interests, instruments, jams },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Item added successfully', 'success');
          }
        });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    const email = Meteor.user().username;
    // Create the form schema for uniforms. Need to determine all interests and jams for multi select list.
    const allInterests = _.pluck(Interests.collection.find().fetch(), 'name');
    const allJams = _.pluck(Jams.collection.find().fetch(), 'name');
    const allInstruments = _.pluck(Instruments.collection.find().fetch(), 'name');
    const formSchema = makeSchema(allInterests, allJams, allInstruments);
    const bridge = new SimpleSchema2Bridge(formSchema);
    // Now create the model with all the user information.
    const jams = _.pluck(ProfilesJams.collection.find({ profile: email }).fetch(), 'jam');
    const interests = _.pluck(ProfilesInterests.collection.find({ profile: email }).fetch(), 'interest');
    const instruments = _.pluck(ProfilesInstruments.collection.find({ profile: email }).fetch(), 'instrument');
    const profile = Profiles.collection.findOne({ email });
    const model = _.extend({}, profile, { interests, instruments, jams });
    let fRef = null;
    return (
        <div className="bg-image">
          <Grid id="createProfile-page" container centered>
            <Grid.Column>
              <Header as="h2" textAlign="center" inverted>Profile Creation</Header>
              <AutoForm ref={ref => { fRef = ref; }}
                        model={model} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
                <Segment>
                  <Form.Group widths={'equal'}>
                    <TextField id='name' name='name' required showInlineError={true} placeholder={'Name'}/>
                  </Form.Group>
                  <LongTextField id='bio' name='bio' placeholder='Write a little bit about yourself.'/>
                  <Form.Group widths={'equal'}>
                    <MultiSelectField id='interests' className="multiselect" name='interests' showInlineError={true} placeholder={'Interests'}/>
                    <MultiSelectField id='instruments' className="multiselect" name='instruments' showInlineError={true} placeholder={'Instruments'}/>
                  </Form.Group>
                  <SubmitField id='createProfile-page-submit' value='Add' onClick={this.handleClick}/>
                </Segment>
              </AutoForm>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

CreateProfile.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(Interests.userPublicationName);
  const sub2 = Meteor.subscribe(Instruments.userPublicationName);
  const sub3 = Meteor.subscribe(Jams.userPublicationName);
  const sub4 = Meteor.subscribe(Profiles.userPublicationName);
  const sub5 = Meteor.subscribe(ProfilesInterests.userPublicationName);
  const sub6 = Meteor.subscribe(ProfilesJams.userPublicationName);
  const sub7 = Meteor.subscribe(ProfilesInstruments.userPublicationName);
  return {
    ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready() && sub5.ready() && sub6.ready() && sub7.ready(),
  };
})(CreateProfile);
