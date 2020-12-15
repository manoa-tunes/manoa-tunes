import React from 'react';
import { Segment } from 'semantic-ui-react';
import { AutoForm, ErrorsField, HiddenField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import PropTypes from 'prop-types';
import { Notes } from '../../api/note/Notes';
/** Create a schema to specify the structure of the data to appear in the form. */

const bridge = new SimpleSchema2Bridge(Notes.schema);

/** Renders the Page for adding a document. */
class AddNote extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { note, contactId, owner, user, picture, createdAt } = data;
    Notes.collection.insert({ note, contactId, owner, user, picture, createdAt },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Item added successfully', 'success');
            formRef.reset();
          }
        });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
          <Segment>
            <TextField label="Review" name='note'/>
            <SubmitField value='Submit'/>
            <ErrorsField/>
            <HiddenField name='owner' value={this.props.owner}/>
            <HiddenField name='contactId' value={this.props.contactId}/>
            <HiddenField name='user' value={this.props.user}/>
            <HiddenField name='picture' value={this.props.picture}/>
            <HiddenField name='createdAt' value={new Date()}/>
          </Segment>
        </AutoForm>
    );
  }
}
AddNote.propTypes = {
  owner: PropTypes.string.isRequired,
  contactId: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
};
export default AddNote;
