import React from 'react';
import { Card, Image, Label, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { withRouter } from 'react-router-dom';

class ProfileCard extends React.Component {

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
        </Card>
    );
  }
}

ProfileCard.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default withRouter(ProfileCard);
