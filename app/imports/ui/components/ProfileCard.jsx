import React from 'react';
import { Card, Image, Label, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';

/** Component for layout out a Profile Card. */
export const ProfileCard = (props) => (
    <Card>
      <Card.Content>
        <Image floated='right' size='mini' src={props.profile.picture}/>
        <Card.Header>{props.profile.name}</Card.Header>
        <Card.Meta>
          <span className='date'>{props.profile.email}</span>
        </Card.Meta>
        <Card.Description>
          {props.profile.bio}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Header as='h5'>Interests</Header>
        {_.map(props.profile.interests,
            (interest, index) => <Label key={index} size='tiny' color='black'>{interest}</Label>)}
      </Card.Content>
      <Card.Content extra>
        <Header as='h5'>Instruments</Header>
        {_.map(props.profile.instruments,
            (instrument, index) => <Label key={index} size='tiny' color='black'>{instrument}</Label>)}
      </Card.Content>
      <Card.Content extra>
        <Header as='h5'>Jams</Header>
        {_.map(props.profile.jams, (jam, index) => <Label key={index} size='tiny' color='green'>{jam}</Label>)}
      </Card.Content>
    </Card>
);

ProfileCard.propTypes = {
  profile: PropTypes.object.isRequired,
};
