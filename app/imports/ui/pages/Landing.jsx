import React from 'react';
import { Grid, Header, Segment, List, Icon } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div className='bg-image'>
          <Grid container centered stackable id='landing-page'>
            <Grid.Row>
              <Header as='h1' size='huge' inverted color='green'>
                Manoa Tunes
                <Header.Subheader color='black'>
                  A Hub for People to Connect through the Power of Music
                </Header.Subheader>
              </Header>
            </Grid.Row>

           {/* <Image size='huge' centered src="/images/band.png"/> */}

            <Grid.Row columns={2} stretched>
              <Grid.Column textAlign='left' className='test'>
                <Header as='h3' attached='top'>
                  <Icon circular name='calendar check' inverted color='green' />
                  Upcoming Jam Meeting
                </Header>
                <Segment attached>
                  Jam session with the makers of Manoa Tunes! <br/> <br/>
                  Meeting on 11/03/2026
                </Segment>
              </Grid.Column>
              <Grid.Column textAlign='right' className='test'>
                <Header as='h3' attached='top'>
                  Featured Track
                  <Icon circular name='play' inverted color='green' className='icons-landing'/>
                </Header>
                <Segment attached>
                  To lighten everyone&apos;s spirits, today&apos;s track is Dynamite by BTS! <br/> <br/>
                  <a href="https://www.youtube.com/watch?v=gdZLi9oWNZg">Click here to get directed to the song!</a>
                </Segment>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2} stretched>
              <Grid.Column textAlign='left'>
                <Header as='h3' attached='top'>
                  <Icon circular name='user outline' inverted color='green' />
                  Features
                </Header>
                <Segment attached>
                  <List bulleted>
                    <List.Item>Keyword Interest Searching</List.Item>
                    <List.Item>Planning In-Person Events</List.Item>
                    <List.Item>Clickable Links to other Artists&apos;s Music</List.Item>
                    <List.Item>Customizable Profiles</List.Item>
                  </List>
                </Segment>
              </Grid.Column>
              <Grid.Column textAlign='right'>
                <Header as='h3' attached='top'>
                  Frequently Asked Questions
                  <Icon circular name='question circle' inverted color='green' className='icons-landing'/>
                </Header>
                <Segment attached>
                  <p>How do I create an account?<p>Sign up in the top right corner above!</p></p>

                  <p>How can I contact the creators of the site?<p>Contact information below!</p></p>
                </Segment>
              </Grid.Column>
            </Grid.Row>
        </Grid>
  </div>
  );
  }
  }

  export default Landing;
