import React, { FC, ReactNode, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import "./App.css";

import Home from "./components/home/home";
import Books from "./container/books_container";
import MyBooks from "./container/mybooks_container";
import MyBook from "./container/mybook_container";
import NewUser from "./container/users/new_user_container";
import Login from "./container/sessions/login_container";
import { initialState } from "./reducer";
import { currentUser } from "./actions/sessions_action";

type Private = { children: ReactNode; logged_in: boolean; path: string };

const PrivateRoute: FC<Private> = ({ children, logged_in, path }) => {
  return logged_in ? (
    <Route path={path}>{children}</Route>
  ) : (
    <Redirect to="/users/new"></Redirect>
  );
};

const mapStateToProps = (state: initialState) => ({
  logged_in: state.login.logged_in,
  checked: state.login.checked,
  message: state.message,
});

const mapDispatchProps = (dispatch: Dispatch) => ({
  getCurrentUser: () => {
    dispatch(currentUser.get());
  },
});

type AppProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchProps>;

const App: FC<AppProps> = ({ logged_in, checked, message, getCurrentUser }) => {
  useEffect(getCurrentUser, [logged_in]);

  if (!checked) {
    return null;
  }

  return (
    <>
      <header></header>
      <div className="wrapper">
        <div className="container">
          <Switch>
            <Route path="/users/new">
              <NewUser />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/mybooks/:id" logged_in={logged_in}>
              <MyBook />
            </PrivateRoute>
            <PrivateRoute path="/mybooks" logged_in={logged_in}>
              <MyBooks />
            </PrivateRoute>
            <PrivateRoute path="/books" logged_in={logged_in}>
              <Books />
            </PrivateRoute>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
          {message && message.success ? (
            <div className="success-message">{message.success}</div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchProps)(App);
