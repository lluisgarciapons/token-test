import { useState, useEffect } from "react";
import logo from './logo.svg';
import axios from "axios";
import './App.css';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from "./constants/constants";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/Login/Login";
import Register from './components/Register/Register';
import Test from './components/test/Test';
import PrivateRoute from "./utils/PrivateRoute";
import setAuthToken from "./utils/setAuthToken";
import { PromiseProvider } from "mongoose";

function App(props) {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("useeffect de app");
    let token = localStorage.getItem(ACCESS_TOKEN_NAME);
    if (token) {
      autoLogin(token);
    } else {
      setLoading(false);
    }
  }, []);

  const autoLogin = token => {
    axios.get(`${API_BASE_URL}/user/currentUser`, { headers: { authorization: `Bearer ${token}` } })
      .then(response => {
        console.log(response.data);
        setAuthToken(token);
        setLoading(false);
      })
      .catch(err => {
        setAuthToken();
        localStorage.removeItem(ACCESS_TOKEN_NAME);
        setLoading(false);
      });
  };

  return (
    <Router>
      <div className="App">
        {!loading ? <Switch>
          <PrivateRoute path="/" exact={true}>
            <Home />
          </PrivateRoute>

          <Route path="/register">
            <Register />
          </Route>

          <Route path="/login" component={Login} />

          <PrivateRoute path="/mensaje/:id" component={Test} />
        </Switch> : "Loading..."}
      </div>
    </Router>
  );
}

export default App;
