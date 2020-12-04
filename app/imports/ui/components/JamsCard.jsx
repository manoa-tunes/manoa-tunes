import React from 'react';
import { Card, Image, Label, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { withRouter, Link } from 'react-router-dom';

class JamsCard extends React.Component {
  render() {
    return (
        <Card>
          <Card.Content>
            <Card.Header style={{ marginTop: '0px' }}>{this.props.jam.name}</Card.Header>
            <Card.Description>
              <span className='date'>Contact Information: {this.props.jam.contact}</span>
            </Card.Description>
            <Card.Description>
              <span className='date'>Location: {this.props.jam.location}</span>
            </Card.Description>
            <Card.Description>
              <span className='date'>Date: {this.props.jam.date}</span>
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
            <Link to={`/edit/${this.props.jam._id}`}>Edit</Link>
          </Card.Content>
        </Card>
    );
  }
}

JamsCard.propTypes = {
  jam: PropTypes.object.isRequired,
};

export default withRouter(JamsCard);
