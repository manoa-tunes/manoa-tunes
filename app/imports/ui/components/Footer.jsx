import React from 'react';
import { Grid, GridColumn, Header, Icon, Image, List } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    return (
        <div className="footer">
          <footer>
            <div className="ui container">
              <Grid columns={2}>
                <GridColumn className="inverted">
                  <hr />
                  <Header className="inverted" textAlign="left">Navigation</Header>
                  <List inverted>
                    <List.Item href='https://manoatunes.xyz/' className="text">Home</List.Item>
                    <List.Item href='https://github.com/manoa-tunes/manoa-tunes' className='text'>Our Github</List.Item>
                    <List.Item href='https://manoa-tunes.github.io/' className="text">About Us</List.Item>
                    <List.Item href='https://www.meteor.com/install' className="text">Meteor Installation</List.Item>
                    <List.Item href='/signup#/signup' className="text">Sign Up</List.Item>
                  </List>
                </GridColumn>

                <GridColumn>
                  <hr />
                  <Image size='tiny'
                         src="https://cdn.discordapp.com/attachments/779160949814067200/782345086981111819/logo.png"/>
                  <List inverted>
                    <List.Item className="text">Manoa-Tunes Team</List.Item>
                    <List.Item className="text">ICS 314 Project</List.Item>
                    <List.Item className="text">University of Hawaii</List.Item>
                    <List.Item className="text">Honolulu, HI 96822</List.Item>
                    <List.Item className="text"><Icon name='copyright'/> Manoa-Tunes 2020   </List.Item>
                  </List>
                </GridColumn>
              </Grid>
            </div>
          </footer>
        </div>
    );
  }
}

export default Footer;
