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
import Header from "../AtomicComponents/D-Templates/Header";

//Page
import CalendarPage from "../AtomicComponents/E-Pages/CalendarPage";
import FriendsPage from "../AtomicComponents/E-Pages/FriendsPage";
import MySimtimePage from "../AtomicComponents/E-Pages/MySimtimePage";

import styled from "styled-components";
import { ModalProvider } from "../contexts/modalContext";
import { MenuProvider } from "../contexts/menuContext";

const alertOptions = {
  timeout: 3000,
  position: "top center",
  //expected one of ["top left","top center","top right","middle left","middle","middle right","bottom left","bottom center","bottom right"]
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
  componentWillMount() {
    store.dispatch(loadUser());
  }

  // componentDidMount() {
  //   store.dispatch(loadUser());
  // }

  render() {
    // return (
    //   <Fragment>
    //     <GlobalStyle />
    //     <AppContents>
    //       <Header />
    //       <CalendarPage />
    //     </AppContents>
    //   </Fragment>
    // );
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
    // );

    return (
      <Provider store={store}>
        <ModalProvider>
        <MenuProvider>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <HashRouter>
            <Fragment>
              <GlobalStyle />
              <AppContents>
                <Header /> 
                <Alerts />
                <Switch>
                  <PrivateRoute exact path="/" component={CalendarPage} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/friends" component={FriendsPage} />
                  <Route exact path="/mysimtime" component={MySimtimePage} />
                </Switch>
              </AppContents>
            </Fragment>
          </HashRouter>
        </AlertProvider>
        </MenuProvider>
        </ModalProvider>
      </Provider>
    );
  }
}

ReactDom.render(<App />, document.getElementById("app"));
