import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Form from './Add';
import Home from './Home';
import Books from './Book'
import UserProfile from "./UsersProfile";
import './Homepage.css';

function App() {
  {
    return (

        <Router>
          <div>

            <Login/>
            <Switch>
              <Route path='/home' component={Home}/>
              <Route path='/login' component={Login}/>
              <Route path='/book' component={Books}/>
              <Route path='/addbook' component={Form}/>
              <Route path='/user-profile' component={UserProfile}/>
            </Switch>

          </div>
        </Router>
    )
  }

}

export default App;