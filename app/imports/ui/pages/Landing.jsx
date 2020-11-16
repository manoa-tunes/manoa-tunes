import React from 'react';
import { Grid, Header, Card, Segment, List } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div className='bg-image'>
          <Grid container centered stackable>
            <Grid.Row>
              <Header as='h1' size='huge' inverted color='green'>
                Manoa Tunes
                <Header.Subheader>
                  A Hub for People to Connect through the Power of Music
                </Header.Subheader>
              </Header>
            </Grid.Row>
            <div className="ui two cards" style={{ color: '#119DA4' }}>
              <div className="card">
                <Card.Content>
                  <Grid.Column textAlign='left'>
                    <Grid.Row>
                      <Header as='h2' color='red'>Upcoming Jam Meeting</Header>
                      <Card.Header></Card.Header>
                      <Card.Meta></Card.Meta>
                      <Card.Description>
                        Jam session with X and Y Meeting on mm/dd/yyyy
                      </Card.Description>
                    </Grid.Row></Grid.Column>
                </Card.Content>
              </div>
              <div className="card">
                <Card.Content>
                  <Grid.Column textAlign='left'>
                    <Grid.Row>
                      <Header as='h2'>Featured Track</Header>
                      <Card.Header></Card.Header>
                      <Card.Meta></Card.Meta>
                      <Card.Description>
                        We can either add an image here or just have a link and short description of a song.
                      </Card.Description>
                    </Grid.Row></Grid.Column></Card.Content>
              </div>
              <div className="card">
                <Card.Content>
                  <Grid.Column textAlign='left'>
                    <Grid.Row>
                      <Header as='h2'>Features</Header>
                      <Card.Header></Card.Header>
                      <Card.Meta></Card.Meta>
                      <Card.Description>
                        <Segment attached>
                          <List bulleted>
                            <List.Item>Keyword Interest Searching</List.Item>
                            <List.Item>Planning In-Person Events</List.Item>
                            <List.Item>Clickable Links to Artist`s Music</List.Item>
                          </List>
                        </Segment>
                      </Card.Description>
                    </Grid.Row></Grid.Column></Card.Content>
              </div>
              <div className="card">
                <Card.Content>
                  <Grid.Column textAlign='left'>
                    <Grid.Row>
                      <Header as='h2'>Frequently Asked Questions</Header>
                      <Card.Header></Card.Header>
                      <Card.Meta></Card.Meta>
                      <Card.Description>
                        <Segment attached>
                          <List bulleted>
                            <List.Item>What is the meaning of life?<br/>
                              Not too sure, but I keep hearing this 42 business.</List.Item>
                            <List.Item><br/></List.Item>
                          </List>
                        </Segment>
                      </Card.Description>
                    </Grid.Row></Grid.Column></Card.Content>
              </div>
            </div>
          </Grid>
        </div>
    );
  }
}

export default Landing;
