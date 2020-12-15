import React from 'react';
import { Feed, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Notes } from '../../api/note/Notes';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class NoteAdmin extends React.Component {
  handleClick = () => {
    Notes.collection.remove(this.props.note._id);
  };

  render() {
    return (
        <div className="white">
          <Feed.Event>
            <Feed.Content>
              <Image floated='left' size='mini' src={this.props.note.picture}/>
              <Feed.Date content={`${this.props.note.user} | ${this.props.note.createdAt.toLocaleDateString('en-US')}`} />
              <br/>
              <Feed.Summary>
                {this.props.note.note}
              </Feed.Summary>
              <Feed.Summary>
                <button className="ui button delete" onClick={this.handleClick}>Delete</button>
              </Feed.Summary>
              <br/>
              <br/>
              <hr/>
            </Feed.Content>
          </Feed.Event>
        </div>
    );
  }
}

/** Require a document to be passed to this component. */
NoteAdmin.propTypes = {
  note: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(NoteAdmin);
