import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Confirmation from './pages/Confirmation';
import Questions from './pages/Questions';
import Results from './pages/Results';

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/confirmation" component={Confirmation} />
      <Route path="/questions" component={Questions} />
      <Route path="/results" component={Results} />
    </BrowserRouter>
  );
}

export default Routes;
