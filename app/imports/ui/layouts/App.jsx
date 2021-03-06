import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import Home from '../pages/Home';
import Profiles from '../pages/Profiles';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import AddJam from '../pages/AddJam';
import Jams from '../pages/Jams';
import CreateProfile from '../pages/CreateProfile';
import JamsAdmin from '../pages/JamsAdmin';
import YourProfile from '../pages/YourProfile';
import ProfilesAdmin from '../pages/ProfilesAdmin';
import InterestFilter from '../pages/InterestFilter';
import InstrumentFilter from '../pages/InstrumentFilter';
import JamFilter from '../pages/JamFilter';
import EditProfileAdmin from '../pages/EditProfileAdmin';
import EditJamAdmin from '../pages/EditJamAdmin';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
        <Router>
          <div>
            <NavBar/>
            <Switch>
              <Route exact path="/" component={Landing}/>
              <ProtectedRoute path="/home" component={Home}/>
              <Route path="/signin" component={Signin}/>
              <Route path="/signup" component={Signup}/>
              <ProtectedRoute path="/profiles" component={Profiles}/>
              <ProtectedRoute path="/your-profile" component={YourProfile}/>
              <ProtectedRoute path="/addjam" component={AddJam}/>
              <ProtectedRoute path="/jams" component={Jams}/>
              <ProtectedRoute path="/interest-filter" component={InterestFilter}/>
              <ProtectedRoute path="/instrument-filter" component={InstrumentFilter}/>
              <ProtectedRoute path="/jam-filter" component={JamFilter}/>
              <ProtectedRoute path="/create-profile" component={CreateProfile}/>
              <AdminProtectedRoute path="/editProfile/:_id" component={EditProfileAdmin}/>
              <AdminProtectedRoute path="/editJam/:_id" component={EditJamAdmin}/>
              <AdminProtectedRoute path="/jamsAdmin" component={JamsAdmin}/>
              <AdminProtectedRoute path="/profilesAdmin" component={ProfilesAdmin}/>
              <ProtectedRoute path="/signout" component={Signout}/>
              <Route component={NotFound}/>
            </Switch>
            <Footer/>
          </div>
        </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null;
          return isLogged ?
              (<Component {...props} />) :
              (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
              );
        }}
    />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null;
          const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
          return (isLogged && isAdmin) ?
              (<Component {...props} />) :
              (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
              );
        }}
    />
);

/** Require a component and location to be passed to each ProtectedRoute. */
ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

/** Require a component and location to be passed to each AdminProtectedRoute. */
AdminProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

export default App;
