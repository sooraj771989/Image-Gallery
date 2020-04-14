import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import EditDashboard from "./components/dashboard/EditDashboard";
import AddPost from "./components/dashboard/AddPost";
import InfoPost from "./components/dashboard/InfoPost";
import EditPost from "./components/dashboard/EditPost";
import history from "./history";
import "./assets/css/app.scss";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Router history={history}>
            <Header />
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute
                exact
                path="/post/new"
                history={history}
                component={AddPost}
              />
              <PrivateRoute
                exact
                path="/post/:id"
                history={history}
                component={InfoPost}
              />
              <PrivateRoute
                exact
                path="/post/:id/edit"
                history={history}
                component={EditPost}
              />
              <PrivateRoute
                exact
                path="/editdashboard"
                history={history}
                component={EditDashboard}
              />
            </Switch>
            <Footer />
          </Router>
        </div>
      </Provider>
    );
  }
}
export default App;
