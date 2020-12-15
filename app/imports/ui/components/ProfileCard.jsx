import React from 'react';
import { Card, Image, Label, Header, Feed, Dropdown, Modal, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import AddNote from './AddNote';
import Note from './Note';
import { Profiles } from '../../api/profiles/Profiles';

class ProfileCard extends React.Component {
  handleClick = () => {
    const allProfile = _.pluck(Profiles.collection.find(this.props.profile._id).fetch(), '_id');
    if (allProfile.length <= 0) {
      swal('Error', 'You have no profile');
      // eslint-disable-next-line
      document.location.href = '/#/';
    }
  };

  render() {
    /** Component for layout out a Profile Card. */
    const whiteText = { color: 'white' };
    const user = _.pluck(Profiles.collection.find({ email: Meteor.user().username }).fetch(), 'picture');
    const fix = user[0];
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
                  onClick={this.handleClick}
                    className="card-bg">
              <Modal trigger={<Dropdown.Item>Open Reviews</Dropdown.Item>}>
                <Modal.Content extra className="comment-bg">
                <Header as='h1' className="card-header" style={whiteText}>{this.props.profile.name} : Reviews</Header>
                <Feed>
                  {_.map(this.props.notes, (note, index) => <Note key={index} note={note}/>)}
                </Feed>
              </Modal.Content>
                <Modal.Content extra className="comment-bg">
                  <AddNote owner={this.props.profile.name} contactId={this.props.profile._id} user={Meteor.user().username} picture={fix}/>
                </Modal.Content>
              </Modal>
          </Button>

        </Card>
    );
  }
}

ProfileCard.propTypes = {
  profile: PropTypes.object.isRequired,
  notes: PropTypes.array.isRequired,
};

export default withRouter(ProfileCard);
