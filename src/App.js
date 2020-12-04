import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import './App.css';
import Login from 'components/Login'
import PrivateRoute from 'components/PrivateRoute'
import Student from 'components/Student'
import Dashboard from 'components/Dashboard'
import Tag from 'components/Tag'
import SalesGuy from 'components/SalesGuy'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/student/s" />        
        </Route>
        <PrivateRoute exact path="/dashboard" comp={Dashboard}/>
        <Route exact path="/login" component={Login} />
        <PrivateRoute path="/student" comp={Student}/>
        <PrivateRoute path="/tag" comp={Tag}/>
        <PrivateRoute path="/sales-guy" comp={SalesGuy}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
