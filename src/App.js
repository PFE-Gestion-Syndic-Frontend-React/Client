import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Guest from './components/guest';
import Home from './components/home';
import Login from './components/login';
import Resetpassword from './components/resetpassword';
import 'font-awesome/css/font-awesome.min.css'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify';
import 'bootstrap-icons/font/bootstrap-icons.css'
import NewPassword from './components/newPassword';



toast.configure()
function App() {
  return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/reset-password" component={Resetpassword} />
            <Route exact path="/home" render={() => <Home />}  />
            <Route exact path="/accueil" component={Guest} />
            <Route exact path="/newPassword/:email/:tele:/:id" component={NewPassword} />
          </Switch>
        </Router>
      </div>
  );
}

export default App;
