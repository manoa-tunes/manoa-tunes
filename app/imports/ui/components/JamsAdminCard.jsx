import React from 'react';
import { Card, Label, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
// import swal from 'sweetalert';
import { withRouter } from 'react-router-dom';
// import { Meteor } from 'meteor/meteor';
import { Jams } from '../../api/jams/Jams';
import { ProfilesJams } from '../../api/profiles/ProfilesJams';
import { JamsInterests } from '../../api/jams/JamsInterests';
import { JamsInstruments } from '../../api/jams/JamsInstruments';
import { Profiles } from '../../api/profiles/Profiles';

class JamsCard extends React.Component {
  handleClick = () => {
    Jams.collection.remove(this.props.jam._id);
    JamsInterests.collection.remove(this.props.jam._id);
    JamsInstruments.collection.remove(this.props.jam._id);
    Profiles.collection.remove(this.props.jam._id);
    const deleteJam = _.pluck(ProfilesJams.collection.find({ jam: this.props.jam.name }).fetch(), '_id');
    for (let i = 0; i < deleteJam.length; i++) {
      ProfilesJams.collection.remove(deleteJam[i]);
    }
    // eslint-disable-next-line no-undef
    document.location.reload(true);
  };

  render() {
    return (
        <Card>
          <Card.Content className="card-bg2">
            <Card.Header style={{ marginTop: '0px' }}>{this.props.jam.name}</Card.Header>
            <Card.Description>
              <span className='date'><b>Contact Information:</b> {this.props.jam.contact}</span>
            </Card.Description>
            <Card.Description>
              <span className='date'><b>Location:</b> {this.props.jam.location}</span>
            </Card.Description>
            <Card.Description>
              <span className='date'><b>Date:</b> {this.props.jam.date}</span>
            </Card.Description>
          </Card.Content>
          <Card.Content extra className="card-bg2">
            <Header as='h5'>Interests</Header>
            {_.map(this.props.jam.interests,
                (interest, index) => <Label key={index} size='tiny' color='teal'>{interest}</Label>)}
          </Card.Content>
          <Card.Content extra className="card-bg2">
            <Header as='h5'>Instruments</Header>
            {_.map(this.props.jam.instruments,
                (instruments, index) => <Label key={index} size='tiny' color='teal'>{instruments}</Label>)}
          </Card.Content>
          <Card.Content extra className="card-bg2">
            <Header as='h5'>Participants</Header>
            {_.size(this.props.jam.participants)}
          </Card.Content>
          <Card.Content extra className="card-bg2">
            <button className="ui button delete" onClick={this.handleClick}>Delete </button>
          </Card.Content>
        </Card>
    );
  }
}

JamsCard.propTypes = {
  jam: PropTypes.object.isRequired,
};

export default withRouter(JamsCard);
