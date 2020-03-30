import React, { Component, Fragment } from "react";
import ReactDom from "react-dom";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

//redux
import { Provider } from "react-redux";
import store from "../store";

// import Modal from "react-redux-modal-flex";
import Header from "./E-Pages/layout/Header";
import Alerts from "./E-Pages/layout/Alerts";
import Login from "./E-Pages/accounts/Login";
// import Register from "./E-Pages/accounts/Register";
// import Dashboard from "./E-Pages/invitations/Dashboard";
import PrivateRoute from "./E-Pages/common/privateRoute";

import { loadUser } from "../actions/auth";

const alertOptions = {
  timeout: 3000,
  position: "top center"
};

class App extends Component {
  componentDidMount() {
    // store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <HashRouter>
            <Fragment>
              <Header />
              <Alerts />
              <div id="app-contents">
                <Switch>
                  <PrivateRoute exact path="/" component={Dashboard} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
                <Login />
              </div>
            </Fragment>
          </HashRouter>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDom.render(<App />, document.getElementById("app"));
