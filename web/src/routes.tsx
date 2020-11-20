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
import Questions from './pages/Questions';
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
  if (!user.verified && path !== '/confirmation') {
    return <Redirect to="/confirmation" />;
  }
  if (user.verified && !user.profile && path !== '/questions') {
    return <Redirect to="/questions" />;
  }

  return <Route {...props} />;
};

const PublicRoute: React.FC<RouteProps> = (props) => {
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
        <PublicRoute path="/" exact component={Login} />
        <PublicRoute path="/login" component={Login} />
        <PublicRoute path="/register" component={Register} />

        <PrivateRoute path="/confirmation" component={Confirmation} />
        <PrivateRoute path="/questions" component={Questions} />
        <PrivateRoute path="/results" component={Results} />
        <PrivateRoute path="/foods" component={Foods} />
        <PrivateRoute path="/principal" component={Principal} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
