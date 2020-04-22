import React, { Component, Fragment } from "react";
import ReactDom from "react-dom";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

// import Modal from "react-redux-modal-flex";
// import Header from "./layout/Header";
import Alerts from "./layout/Alerts";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import Dashboard from "./invitations/Dashboard";
import PrivateRoute from "./common/privateRoute";

//redux
import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../actions/auth";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";


import * as Colors from "../AtomicComponents/Colors";
import GlobalStyle from "../AtomicComponents/GlobalStyle";
import Paragraph from "../AtomicComponents/A-Atomics/text/Paragraph";
import Header from "../AtomicComponents/D-Templates/Header";
import Calendar from "../AtomicComponents/E-Pages/Dashboard";

import styled from "styled-components";


const alertOptions = {
  timeout: 3000,
  position: "top center",
};

const AppContents = styled.div`
  float: left;
  width: 920px;
  padding: 0 0.5rem 0.5rem 0.5rem;
  // border: solid 1px green;
  border-top: solid 8px ${Colors["MAIN_COLOR"]};

  @media only screen and (max-width: 768px) {
    width: 100%;
    padding: 0 0 0 0;
  }
`;
class App extends Component {
  // componentDidMount() {
  //   store.dispatch(loadUser());
  // }

  render() {
    return (
      <Fragment>
        <GlobalStyle />
        <AppContents>
          <Header />
          <br />
          <Calendar />
        </AppContents>
      </Fragment>
    );
    // return (
    //   <Provider store={store}>
    //     <AlertProvider template={AlertTemplate} {...alertOptions}>
    //       <HashRouter>
    //         <Fragment>
    //           <Header />
    //           <Alerts />
    //           <div id="app-contents">
    //             <Switch>
    //               <PrivateRoute exact path="/" component={Dashboard} />
    //               <Route exact path="/register" component={Register} />
    //               <Route exact path="/login" component={Login} />
    //             </Switch>
    //           </div>
    //         </Fragment>
    //       </HashRouter>
    //     </AlertProvider>
    //   </Provider>
    //);
  }
}

ReactDom.render(<App />, document.getElementById("app"));
