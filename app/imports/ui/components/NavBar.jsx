import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header, Image } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '10px' };
    return (
        <Menu style={menuStyle} attached="top" borderless inverted>
          <Menu.Item as={NavLink} activeClassName="" exact to="/">
            <Header inverted as='h1'>
              <Image size='massive'
                     src="https://cdn.discordapp.com/attachments/779160949814067200/782345086981111819/logo.png"/></Header>
          </Menu.Item>
          {this.props.currentUser ? (
              [
                // eslint-disable-next-line react/jsx-key
                <Menu.Item>
                      <Dropdown id="profiles-dropdown" text= 'Profiles' simple item>
                        <Dropdown.Menu>
                          <Dropdown.Item id="homeMenuItem" text="Create Profile" as={NavLink} exact to="/home" key='home'/>
                          <Dropdown.Item id="profilesMenuItem" text="All Profile" as={NavLink} exact to="/profiles" key='profiles'/>
                        </Dropdown.Menu>
                      </Dropdown>
                </Menu.Item>,
                // eslint-disable-next-line react/jsx-key
                <Menu.Item>
                  <Dropdown id="jams-dropdown" text= 'Jams' simple item>
                    <Dropdown.Menu>
                      <Dropdown.Item id="addjamMenuItem" text="Create Jams" as={NavLink} exact to="/addjam" key='addjam'/>
                      <Dropdown.Item id="jamsMenuItem" text="All Jams" as={NavLink} exact to="/jams" key='jams'/>
                    </Dropdown.Menu>
                  </Dropdown>
                </Menu.Item>]
          ) : ''}
          {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>
          ) : ''}
          <Menu.Item position="right">
            {this.props.currentUser === '' ? (
                <Dropdown id="login-dropdown" text="Login" pointing="top right" icon={'user'}>
                  <Dropdown.Menu id="back">
                    <Dropdown.Item id="login-dropdown-sign-in" icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                    <Dropdown.Item id="login-dropdown-sign-up" icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
                  </Dropdown.Menu>
                </Dropdown>
            ) : (
                <Dropdown id="navbar-current-user" text={this.props.currentUser} pointing="top right" icon={'user'} >
                  <Dropdown.Menu id="back">
                    <Dropdown.Item id="navbar-sign-out" icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
                  </Dropdown.Menu>
                </Dropdown>
            )}
          </Menu.Item>
        </Menu>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
