import React from 'react';
import { Grid, GridColumn, Header, Icon, Item, List } from 'semantic-ui-react';

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
                    <List.Item href='http://localhost:3000/#/'>Home</List.Item>
                    <List.Item href='https://manoa-tunes.github.io/'>About Us</List.Item>
                  </List>
                </GridColumn>

                <GridColumn>
                  <hr />
                  <Header className="inverted" textAlign="left">Contact Information</Header>
                      <List inverted>
                        <List.Item className="text">
                          Cheolhoon Choi
                          <a href="https://cheolhoon.github.io/"> <Icon name="github" size="large"/></a>
                          <a href="mailto: choi4879@hawaii.edu"> <Icon name="mail" size="large"/> </a>
                        </List.Item>
                        <List.Item className="text">
                          Henry Cheung
                          <a href="https://khhc.github.io/"> <Icon name="github" size="large"/> </a>
                          <a href="mailto: khhc@hawaii.edu"> <Icon name="mail" size="large"/> </a>
                        </List.Item>
                        <List.Item className="text">
                          Michael Hui
                          <a href="https://huimichael.github.io/"> <Icon name="github" size="large"/> </a>
                          <a href="mailto: huim@hawaii.edu"> <Icon name="mail" size="large"/> </a>
                        </List.Item>
                        <List.Item className="text">
                          Timothy Huo
                          <a href="https://timothyhuo1.github.io/"> <Icon name="github" size="large"/> </a>
                          <a href="mailto: thuo@hawaii.edu"> <Icon name="mail" size="large"/> </a>
                        </List.Item>
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
