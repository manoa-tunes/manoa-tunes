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
                    <List.Item href='/#/' className="footer-text">Home</List.Item>
                    <List.Item href='https://github.com/manoa-tunes/manoa-tunes' target="_blank" className='footer-text'>Our Github</List.Item>
                    <List.Item href='https://manoa-tunes.github.io/' target="_blank" className="footer-text">About Us</List.Item>
                    <List.Item href='https://www.meteor.com/install' target="_blank" className="footer-text">Meteor Installation</List.Item>
                    <List.Item href='/signup#/signup' target="_blank" className="footer-text">Sign Up</List.Item>
                    <List.Item href='/#/create-profile' target="_blank" className="footer-text">Create Profile</List.Item>
                  </List>
                </GridColumn>

                <GridColumn>
                  <hr />
                  <Image size='tiny'
                         src="https://cdn.discordapp.com/attachments/779160949814067200/782345086981111819/logo.png"/>
                  <List inverted>
                    <List.Item className="footer-text">Manoa-Tunes Team</List.Item>
                    <List.Item className="footer-text">ICS 314 Project</List.Item>
                    <List.Item className="footer-text">University of Hawaii</List.Item>
                    <List.Item className="footer-text">Honolulu, HI 96822</List.Item>
                    <List.Item className="footer-text"><Icon name='copyright'/> Manoa-Tunes 2020 </List.Item>
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
