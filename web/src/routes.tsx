import React from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  RouteProps,
  Switch,
} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Confirmation from './pages/Confirmation';
import Profile from './pages/Profile';
import Results from './pages/Results';
import Principal from './pages/Principal';
import Foods from './pages/Foods';
import { useAuth } from './context/AuthContext';

const PrivateRoute: React.FC<RouteProps> = (props) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  const { path } = props;
  const isUserVerified = user.verified;
  if (!isUserVerified && path !== '/confirmation') {
    return <Redirect to="/confirmation" />;
  }

  const userHasNoProfile = !user.profile;
  if (isUserVerified && userHasNoProfile && path !== '/profile/create') {
    return <Redirect to="/profile/create" />;
  }

  return <Route {...props} />;
};

const UnregisteredUserRoute: React.FC<RouteProps> = (props) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Redirect to="/principal" /> : <Route {...props} />;
};

function Routes() {
  const { isLoading } = useAuth();
  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <BrowserRouter>
      <Switch>
        <UnregisteredUserRoute path="/" exact component={Login} />
        <UnregisteredUserRoute path="/login" component={Login} />
        <UnregisteredUserRoute path="/register" component={Register} />

        <PrivateRoute path="/confirmation" component={Confirmation} />
        <PrivateRoute path="/profile/create" component={Profile} />
        <PrivateRoute path="/results" component={Results} />
        <PrivateRoute path="/foods" component={Foods} />
        <PrivateRoute path="/principal" component={Principal} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
