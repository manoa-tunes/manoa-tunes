import React from 'react';
import { Grid, GridColumn, Header, Icon, Item, List } from 'semantic-ui-react';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    return (
        <div className="footer">
          <footer>
            <div className="ui container">
              <Grid columns={3}>
                <GridColumn className="inverted">
                  <hr />
                  <Header className="inverted" textAlign="left">Navigation</Header>
                  <List inverted>
                    <List.Item href='/' className="text">Home</List.Item>
                    <List.Item href='https://manoa-tunes.github.io/' className="text">About Us</List.Item>
                    <List.Item href='/signup#/signup' className="text">Sign Up</List.Item>
                  </List>
                </GridColumn>

                <GridColumn>
                  <hr />
                  <Header className="inverted" textAlign="left">Contact Information</Header>
                      <List inverted>
                        <List.Item className="text">
                          Our Github
                          <a href="https://github.com/manoa-tunes/manoa-tunes"> <Icon name="github" size="large"/></a>
                        </List.Item>
                        <List.Item className="text">
                          Cheolhoon Choi
                          <a href="mailto: choi4879@hawaii.edu"> <Icon name="mail" size="large"/> </a>
                        </List.Item>
                        <List.Item className="text">
                          Henry Cheung
                          <a href="mailto: khhc@hawaii.edu"> <Icon name="mail" size="large"/> </a>
                        </List.Item>
                        <List.Item className="text">
                          Michael Hui
                          <a href="mailto: huim@hawaii.edu"> <Icon name="mail" size="large"/> </a>
                        </List.Item>
                        <List.Item className="text">
                          Timothy Huo
                          <a href="mailto: thuo@hawaii.edu"> <Icon name="mail" size="large"/> </a>
                        </List.Item>
                      </List>
                </GridColumn>

                <GridColumn>
                  <hr/>
                  <Image size="tiny"
                      src="https://anad.org/wp-content/uploads/2017/09/university-of-hawaii-manoa.png"/>
                </GridColumn>
              </Grid>
            </div>
          </footer>
        </div>
    );
  }
}

export default Footer;
