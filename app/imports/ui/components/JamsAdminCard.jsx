import React from 'react';
import { Card, Image, Label, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import swal from 'sweetalert';
import { withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
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

  handleClick2 = () => {
    const user = Meteor.user().username;
    let count = 0;
    const check = _.pluck(ProfilesJams.collection.find({ jam: this.props.jam.name }).fetch(), 'profile');
    for (let i = 0; i < check.length; i++) {
      if (check[i] === user) {
        count = 1;
      }
    }
    if (count === 0) {
      ProfilesJams.collection.insert({ jam: this.props.jam.name, profile: user });
      swal('Success', 'Joined Jam Successfully');
      // eslint-disable-next-line no-undef
      document.location.reload(true);
    } else {
      swal('Error', 'Already In This Jam');
    }
  };

  handleClick3 = () => {
    const user = Meteor.user().username;
    let count = 0;
    const check = _.pluck(ProfilesJams.collection.find({ jam: this.props.jam.name }).fetch(), 'profile');
    for (let i = 0; i < check.length; i++) {
      if (check[i] === user) {
        count = 1;
      }
    }
    if (count === 1) {
      const deleteJam = _.pluck(ProfilesJams.collection.find({ jam: this.props.jam.name, profile: user }).fetch(), '_id');
      const last = deleteJam[0];
      ProfilesJams.collection.remove(last);
      swal('Success', 'Left Jam Successfully');
      // eslint-disable-next-line no-undef
      document.location.reload(true);
    } else {
      swal('Error', 'Not In This Jam');
    }
  }

  render() {
    return (
        <Card>
          <Card.Content>
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
          <Card.Content extra>
            <Header as='h5'>Interests</Header>
            {_.map(this.props.jam.interests,
                (interest, index) => <Label key={index} size='tiny' color='teal'>{interest}</Label>)}
          </Card.Content>
          <Card.Content extra>
            <Header as='h5'>Instruments</Header>
            {_.map(this.props.jam.instruments,
                (instruments, index) => <Label key={index} size='tiny' color='teal'>{instruments}</Label>)}
          </Card.Content>
          <Card.Content extra>
            <Header as='h5'>Participants</Header>
            {_.map(this.props.jam.participants, (p, index) => <Image key={index} circular size='mini' src={p}/>)}
          </Card.Content>
          <Card.Content extra>
            <button className="ui button" onClick={this.handleClick}>Delete </button>
          </Card.Content>
          <Card.Content extra>
            <button className="ui button" onClick={this.handleClick2}>Join </button>
          </Card.Content>
          <Card.Content extra>
            <button className="ui button" onClick={this.handleClick3}>Leave </button>
          </Card.Content>
        </Card>
    );
  }
}

JamsCard.propTypes = {
  jam: PropTypes.object.isRequired,
};

export default withRouter(JamsCard);
