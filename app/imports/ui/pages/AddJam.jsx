import React from 'react';
import { Grid, Segment, Header, Form, Loader } from 'semantic-ui-react';
import { AutoForm, TextField, SubmitField } from 'uniforms-semantic';
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
import { addJamMethod } from '../../startup/both/Methods';

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allInterests, allParticipants, allInstruments) => new SimpleSchema({
  name: { type: String, label: 'Name', optional: true },
  contact: { type: String, label: 'Contact', optional: true },
  date: { type: String, label: 'Date', optional: true },
  location: { type: String, label: 'Location', optional: true },
  interests: { type: Array, label: 'Interests', optional: true },
  'interests.$': { type: String, allowedValues: allInterests },
  instruments: { type: Array, label: 'Instruments', optional: true },
  'instruments.$': { type: String, allowedValues: allInstruments },
  participants: { type: Array, label: 'Participants', optional: true },
  'participants.$': { type: String, allowedValues: allParticipants },
});

/** Renders the Home Page: what appears after the user logs in. */
class AddJam extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    Meteor.call(addJamMethod, data, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Profile updated successfully', 'success').then(() => formRef.reset());
      }
    });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    // const email = Meteor.user().username;
    const allInterests = _.pluck(Interests.collection.find().fetch(), 'name');
    const allParticipants = _.pluck(Profiles.collection.find().fetch(), 'email');
    const allInstruments = _.pluck(Instruments.collection.find().fetch(), 'name');
    const formSchema = makeSchema(allInterests, allParticipants, allInstruments);
    const bridge = new SimpleSchema2Bridge(formSchema);
    // const jams = _.pluck(ProfilesJams.collection.find({ profile: email }).fetch(), 'jam');
    // const interests = _.pluck(ProfilesInterests.collection.find({ profile: email }).fetch(), 'interest');
    // const instruments = _.pluck(ProfilesInstruments.collection.find({ profile: email }).fetch(), 'instruments');
    // const profile = Profiles.collection.findOne({ email });
    // const model = _.extend({}, profile, { interests, instruments, jams });
    let fRef = null;
    return (
        <div className="bg-image">
          <Grid id="home-page" container centered>
            <Grid.Column>
              <Header as="h2" textAlign="center" inverted>Your Jams</Header>
              <AutoForm ref={ref => { fRef = ref; }}
                         schema={bridge} onSubmit={data => this.submit(data, fRef)}>
                <Segment>
                  <Form.Group widths={'equal'}>
                    <TextField id='name' name='name' showInlineError={true} placeholder={'Name Of Your Jam'}/>
                    <TextField name='contact' showInlineError={true} placeholder={'contact'}/>
                  </Form.Group>
                  <Form.Group widths={'equal'}>
                    <TextField name='date' showInlineError={true} placeholder={'date'}/>
                    <TextField name='location' showInlineError={true} placeholder={'location'}/>
                  </Form.Group>
                  <Form.Group widths={'equal'}>
                    <MultiSelectField className="multiselect" name='interests' showInlineError={true} placeholder={'Interests'}/>
                    <MultiSelectField className="multiselect" name='instruments' showInlineError={true} placeholder={'Instruments'}/>
                  </Form.Group>
                  <Form.Group widths={'equal'}>
                    <MultiSelectField id='participants' name='participants' showInlineError={true} placeholder={'Participants'}/>
                  </Form.Group>
                  <SubmitField id='home-page-submit' value='Update'/>
                </Segment>
              </AutoForm>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

AddJam.propTypes = {
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
})(AddJam);
