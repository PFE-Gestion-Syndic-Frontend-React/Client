import React, { useState } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Guest from './components/guest';
import Home from './components/home';
import Login from './components/login';
import Resetpassword from './components/resetpassword';
import 'font-awesome/css/font-awesome.min.css'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify';
import 'bootstrap-icons/font/bootstrap-icons.css'



toast.configure()
function App() {
  return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/reset-password" component={Resetpassword} />
            <Route exact path="/home" render={() => <Home />}  />
            <Route exact path="/acceuil" component={Guest} />
          </Switch>
        </Router>
      </div>
  );
}

export default App;
