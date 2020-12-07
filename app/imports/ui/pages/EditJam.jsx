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
import { JamsInstruments } from '../../api/jams/JamsInstruments';
import { JamsInterests } from '../../api/jams/JamsInterests';
import { ProfilesInstruments } from '../../api/profiles/ProfilesInstruments';
import { updateJamMethod } from '../../startup/both/Methods';

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
class EditJam extends React.Component {
  /** On submit, insert the data. */
  submit(data, formRef) {
    Meteor.call(updateJamMethod, data, (error) => {
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
    const jamName = _.pluck(Jams.collection.find({ contact: Meteor.user().username }).fetch(), 'name'); /* THIS LINE */
    const allInterests = _.pluck(Interests.collection.find().fetch(), 'name');
    const allParticipants = _.pluck(Profiles.collection.find().fetch(), 'email');
    const allInstruments = _.pluck(Instruments.collection.find().fetch(), 'name');
    const formSchema = makeSchema(allInterests, allParticipants, allInstruments);
    const bridge = new SimpleSchema2Bridge(formSchema);
    const people = _.pluck(ProfilesJams.collection.find({ jam: jamName }).fetch(), 'profile');
    const interests = _.pluck(JamsInterests.collection.find({ jam: jamName }).fetch(), 'interest');
    const instruments = _.pluck(JamsInstruments.collection.find({ jam: jamName }).fetch(), 'instruments');
    const jam = Jams.collection.findOne({ jamName });
    const model = _.extend({}, jam, { interests, instruments, people });

    return (
        <div className="bg-image">
          <Grid id="home-page" container centered>
            <Grid.Column>
              <Header as="h2" textAlign="center" inverted>Edit Your Jam</Header>
              <AutoForm model={model} schema={bridge} onSubmit={data => this.submit(data)}>
                <Segment>
                  <Form.Group widths={'equal'}>
                    <TextField id='name' name='name' showInlineError={true} placeholder={"Your Jam's Current Name"} disabled/>
                    <TextField name='contact' showInlineError={true} placeholder={'Contact Information (Email or Phone Number)'} disabled/>
                  </Form.Group>
                  <Form.Group widths={'equal'}>
                    <TextField name='date' showInlineError={true} placeholder={'mm/dd/yy & time'}/>
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

EditJam.propTypes = {
  doc: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  const documentId = match.params._id;
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(Interests.userPublicationName);
  const sub2 = Meteor.subscribe(Instruments.userPublicationName);
  const sub3 = Meteor.subscribe(Jams.userPublicationName);
  const sub4 = Meteor.subscribe(Profiles.userPublicationName);
  const sub5 = Meteor.subscribe(ProfilesInterests.userPublicationName);
  const sub6 = Meteor.subscribe(ProfilesJams.userPublicationName);
  const sub7 = Meteor.subscribe(ProfilesInstruments.userPublicationName);
  return {
    doc: Jams.collection.findOne(documentId),
    ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready() && sub5.ready() && sub6.ready() && sub7.ready(),
  };
})(EditJam);
