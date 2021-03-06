import React from 'react';
import { Card, Label, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import swal from 'sweetalert';
import { withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesJams } from '../../api/profiles/ProfilesJams';

class JamsCard extends React.Component {
  handleClick2 = () => {
    const user = Meteor.user().username;
    let count = 0;
    const check = _.pluck(ProfilesJams.collection.find({ jam: this.props.jam.name }).fetch(), 'profile');
    const allProfile = _.pluck(Profiles.collection.find().fetch(), 'email');
    if (allProfile.includes(user)) {
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
    } else {
      swal('Error', 'You have no profile to join this jam');
    }
  }

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
      const deleteJam = _.pluck(ProfilesJams.collection.find({
        jam: this.props.jam.name,
        profile: user,
      }).fetch(), '_id');
      console.log(deleteJam);
      const last = deleteJam[0];
      ProfilesJams.collection.remove(last);
      swal('Success', 'Left Jam Successfully');
      // eslint-disable-next-line no-undef
      document.location.reload(true);
    } else {
      swal('Error', 'Not In This Jam');
    }
  }

  checker = () => {
    const user = Meteor.user().username;
    const check = _.pluck(ProfilesJams.collection.find({ jam: this.props.jam.name }).fetch(), 'profile');
    for (let i = 0; i < check.length; i++) {
      if (check[i] === user) {
        return false;
      }
    }
    return true;
  }

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
            <button id='join' className="ui button join" onClick={this.handleClick2} disabled={!this.checker()}>Join</button>
            <button id='leave' className="ui button leave" onClick={this.handleClick3} disabled={this.checker()}>Leave</button>
          </Card.Content>
        </Card>
    );
  }
}

JamsCard.propTypes = {
  jam: PropTypes.object.isRequired,
};

export default withRouter(JamsCard);
