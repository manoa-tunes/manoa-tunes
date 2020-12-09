import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Image, Label, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesInstruments } from '../../api/profiles/ProfilesInstruments';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { ProfilesJams } from '../../api/profiles/ProfilesJams';

class YourCard extends React.Component {
  handleClick1 = () => {
    // eslint-disable-next-line
    document.location.reload();

  };

  handleClick2 = () => {
    const deleteInterests = _.pluck(ProfilesInterests.collection.find({ profile: this.props.profile.email }).fetch(), '_id');
    const deleteInstruments = _.pluck(ProfilesInstruments.collection.find({ profile: this.props.profile.email }).fetch(), '_id');
    const deleteJam = _.pluck(ProfilesJams.collection.find({ profile: this.props.profile.email }).fetch(), '_id');
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
    // eslint-disable-next-line no-undef
    document.location.reload();
    // eslint-disable-next-line no-undef
    document.location.href = '/#/profileadmin';
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
          <Card.Content extra className="card-bg">
            <button className="ui button" onClick={this.handleClick1}>Edit</button>
            <button className="ui button delete" onClick={this.handleClick2}>Delete</button>
          </Card.Content>
        </Card>
    );
  }
}

YourCard.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default withRouter(YourCard);
