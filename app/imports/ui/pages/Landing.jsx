import React from 'react';
import { Grid, Header, Segment, List } from 'semantic-ui-react';

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

            <Grid.Row columns={2}>
              <Grid.Column textAlign='left'>
                <Header as='h3' attached='top'>
                  Upcoming Jam Meeting
                </Header>
                <Segment attached>
                  Jam session with X and Y <br/>
                  Meeting on mm/dd/yyyy
                </Segment>
              </Grid.Column>
              <Grid.Column textAlign='right'>
                <Header as='h3' attached='top'>
                  Featured Track
                </Header>
                <Segment attached>
                  We can either add an image here or just have a link and short description of a song.
                </Segment>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
              <Grid.Column textAlign='left'>
                <Header as='h3' attached='top'>
                  Features
                </Header>
                <Segment attached>
                  <List bulleted>
                    <List.Item>Keyword Interest Searching</List.Item>
                    <List.Item>Planning In-Person Events</List.Item>
                    <List.Item>Clickable Links to Artist's Music</List.Item>
                  </List>
                </Segment>
              </Grid.Column>
              <Grid.Column textAlign='right'>
                <Header as='h3' attached='top'>
                  Frequently Asked Questions
                </Header>
                <Segment attached>
                  What is the meaning of life?
                  Not too sure, but I keep hearing this 42 business.
                </Segment>
              </Grid.Column>
            </Grid.Row>
        </Grid>
  </div>
  );
  }
  }

  export default Landing;
