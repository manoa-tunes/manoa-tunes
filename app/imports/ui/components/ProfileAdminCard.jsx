import React from 'react';
import { Card, Image, Label, Header, Modal, Dropdown, Feed, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { withRouter, Link } from 'react-router-dom';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesInstruments } from '../../api/profiles/ProfilesInstruments';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { ProfilesJams } from '../../api/profiles/ProfilesJams';
import { Notes } from '../../api/note/Notes';
import NoteAdmin from './NoteAdmin';

class ProfileAdminCard extends React.Component {

  handleClick2 = () => {
    const deleteInterests = _.pluck(ProfilesInterests.collection.find({ profile: this.props.profile.email }).fetch(), '_id');
    const deleteInstruments = _.pluck(ProfilesInstruments.collection.find({ profile: this.props.profile.email }).fetch(), '_id');
    const deleteJam = _.pluck(ProfilesJams.collection.find({ profile: this.props.profile.email }).fetch(), '_id');
    const deleteNote = _.pluck(Notes.collection.find({ owner: this.props.profile.name }).fetch(), '_id');
    Profiles.collection.remove(this.props.profile._id);
    for (let i = 0; i < deleteInstruments.length; i++) {
      ProfilesInstruments.collection.remove(deleteInstruments[i]);
    }
    for (let i = 0; i < deleteInterests.length; i++) {
      ProfilesInterests.collection.remove(deleteInterests[i]);
    }
    for (let i = 0; i < deleteJam.length; i++) {
      ProfilesJams.collection.remove(deleteJam[i]);
    }
    for (let i = 0; i < deleteNote.length; i++) {
      Notes.collection.remove(deleteNote[i]);
    }
    // eslint-disable-next-line no-undef
    document.location.href = '/#/';
  };

  render() {
    /** Component for layout out a Profile Card. */
    const whiteText = { color: 'white' };
    return (
        <Card>
          <Card.Content className="card-bg">
            <Image floated='right' size='mini' src={this.props.profile.picture}/>
            <Card.Header style={whiteText}>{this.props.profile.name}</Card.Header>
            <Card.Meta style={whiteText}>
              <span className='date'>{this.props.profile.email}</span>
            </Card.Meta>
            <Card.Description style={whiteText}>
              {this.props.profile.bio}
            </Card.Description>
          </Card.Content>
          <Card.Content extra className="card-bg">
            <Header as='h5' style={whiteText} className="card-header">Interests</Header>
            {_.map(this.props.profile.interests,
                (interest, index) => <Label key={index} size='tiny' color='black'>{interest}</Label>)}
          </Card.Content>
          <Card.Content extra className="card-bg">
            <Header as='h5' className="card-header" style={whiteText}>Instruments</Header>
            {_.map(this.props.profile.instruments,
                (instrument, index) => <Label key={index} size='tiny' color='black'>{instrument}</Label>)}
          </Card.Content>
          <Card.Content extra className="card-bg">
            <Header as='h5' className="card-header" style={whiteText}>Jams</Header>
            {_.map(this.props.profile.jams,
                (jam, index) => <Label key={index} size='tiny' color='green'>{jam}</Label>)}
          </Card.Content>
          <Button extra text='Reviews'
                  size='small'
                  inverted
                  className="card-bg">
            <Modal trigger={<Dropdown.Item>Open Reviews</Dropdown.Item>}>
              <Modal.Content extra className="comment-bg">
                <Header as='h1' className="card-header" style={whiteText}>Reviews</Header>
                <Feed>
                  {_.map(this.props.notes, (note, index) => <NoteAdmin key={index} note={note} />)}
                </Feed>
              </Modal.Content>
            </Modal>
          </Button>
          <Card.Content extra className="card-bg">
            <button id='editProfileAdmin' className="ui button "><Link to={`/editProfile/${this.props.profile._id}`}>Edit</Link></button>
            <button className="ui button delete" onClick={this.handleClick2}>Delete</button>
          </Card.Content>
        </Card>
    );
  }
}

ProfileAdminCard.propTypes = {
  profile: PropTypes.object.isRequired,
  notes: PropTypes.array.isRequired,
};

export default withRouter(ProfileAdminCard);
