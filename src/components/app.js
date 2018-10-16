import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch } from 'react-router-dom';
// Components
import AddFoodScreen from './add-food-screen';
import Dashboard from './dashboard';
import HeaderBar from './header-bar';
import LandingPage from './landing-page';
import LoginPage from './login-page';
import Navbar from './navbar';
import NewFoodForm from './new-food-form';
import RegistrationPage from './registration-page';
import SettingsScreen from './settings-screen';
// Actions
import { refreshAuthToken } from '../actions/auth-actions';

export class App extends React.Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      this.startPeriodicRefresh();
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
      this.stopPeriodicRefresh();
    }
  }

  componentWillUnmount() {
    this.stopPeriodicRefresh();
  }

  startPeriodicRefresh() {
    this.refreshInterval = setInterval(
      () => this.props.dispatch(refreshAuthToken()),
      60 * 60 * 1000 // One hour
    );
  }

  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
      return;
    }

    clearInterval(this.refreshInterval);
  }

  render() {
    return (
      <div className="app">
        <HeaderBar />
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/register" component={RegistrationPage} />
        <Route exact path="/login" component={LoginPage} />
        <Switch>
          <Route path="/dashboard/add" component={AddFoodScreen} />
          <Route path="/dashboard/newfood" component={NewFoodForm} />
          <Route path="/dashboard/settings" component={SettingsScreen} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
        <Navbar />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(App));
