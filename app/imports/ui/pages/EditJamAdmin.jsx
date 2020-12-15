import React from 'react';
import { Grid, Segment, Header, Form, Loader } from 'semantic-ui-react';
import { AutoForm, TextField, SubmitField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema from 'simpl-schema';
import { _ } from 'meteor/underscore';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import { Profiles } from '../../api/profiles/Profiles';
import { Interests } from '../../api/interests/Interests';
import { Instruments } from '../../api/instruments/Instruments';
import { Jams } from '../../api/jams/Jams';
import { ProfilesJams } from '../../api/profiles/ProfilesJams';
import { updateJamMethod } from '../../startup/both/Methods';
import { JamsInterests } from '../../api/jams/JamsInterests';
import { JamsInstruments } from '../../api/jams/JamsInstruments';

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

/** Renders the Page for editing a single document. */
class EditJamAdmin extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    Meteor.call(updateJamMethod, data, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Jams updated successfully', 'success');
      }
    });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    // Jam id is URL
    // eslint-disable-next-line no-undef
    const URL = window.location.href;
    let id = URL.substr(URL.indexOf('editJam'));
    id = id.substr(id.indexOf('/') + 1);
    const findName = _.pluck(Jams.collection.find(id).fetch(), 'name');
    const name = findName[0];
    // Create the form schema for uniforms. Need to determine all interests and jams for multi select list.
    const allInterests = _.pluck(Interests.collection.find().fetch(), 'name');
    const allParticipants = _.pluck(Profiles.collection.find().fetch(), 'email');
    const allInstruments = _.pluck(Instruments.collection.find().fetch(), 'name');
    const formSchema = makeSchema(allInterests, allParticipants, allInstruments);
    const bridge = new SimpleSchema2Bridge(formSchema);
    // Now create the model with all the user information.

    const interests = _.pluck(JamsInterests.collection.find({ jam: name }).fetch(), 'interest');
    const instruments = _.pluck(JamsInstruments.collection.find({ jam: name }).fetch(), 'instrument');
    const participants = _.pluck(ProfilesJams.collection.find({ jam: name }).fetch(), 'profile');
    const jam = Jams.collection.findOne({ name });
    const model = _.extend({}, jam, { interests, instruments, participants });
    return (
        <div className="bg-image2">
          <Grid id="editJamAdmin-page" container centered>
            <Grid.Column>
              <Header as="h2" textAlign="center" inverted>Your Jams</Header>
              <AutoForm model={model}
                        schema={bridge} onSubmit={data => this.submit(data)}>
                <Segment>
                  <Form.Group widths={'equal'}>
                    <TextField id='name' name='name' showInlineError={true} placeholder={'Name Of Your Jam'} disabled/>
                    <TextField id='contact' name='contact' showInlineError={true} placeholder={'Contact Information (Email or Phone Number)'}/>
                  </Form.Group>
                  <Form.Group widths={'equal'}>
                    <TextField id='date' name='date' showInlineError={true} placeholder={'mm/dd/yy & time'}/>
                    <TextField id='location' name='location' showInlineError={true} placeholder={'location'}/>
                  </Form.Group>
                  <Form.Group widths={'equal'}>
                    <MultiSelectField id='interests' className="multiselect" name='interests' showInlineError={true} placeholder={'Interests'}/>
                    <MultiSelectField id='instruments' className="multiselect" name='instruments' showInlineError={true} placeholder={'Instruments'}/>
                  </Form.Group>
                  <Form.Group widths={'equal'}>
                    <MultiSelectField id='participants' name='participants' showInlineError={true} placeholder={'Participants'}/>
                  </Form.Group>
                  <SubmitField id='editJamAdmin-page-submit' value='Update'/>
                </Segment>
              </AutoForm>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditJamAdmin.propTypes = {
  jam: PropTypes.object.isRequired,
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const sub1 = Meteor.subscribe(Interests.userPublicationName);
  const sub2 = Meteor.subscribe(Instruments.userPublicationName);
  const sub3 = Meteor.subscribe(Jams.userPublicationName);
  const sub4 = Meteor.subscribe(Profiles.userPublicationName);
  const sub5 = Meteor.subscribe(JamsInterests.userPublicationName);
  const sub6 = Meteor.subscribe(ProfilesJams.userPublicationName);
  const sub7 = Meteor.subscribe(JamsInstruments.userPublicationName);
  return {
    doc: Jams.collection.findOne(documentId),
    ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready() && sub5.ready() && sub6.ready() && sub7.ready(),
  };
})(EditJamAdmin);
