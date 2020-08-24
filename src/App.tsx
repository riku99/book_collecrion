import React, { FC, ReactNode, useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";

import "./App.css";

import Home from "./components/home/home";
import Books from "./container/books/books_container";
import MyBooks from "./container/books/mybooks_container";
import MyBook from "./container/books/mybook_container";
import NewUser from "./container/users/new_user_container";
import Login from "./container/sessions/login_container";
import Logout from "./container/sessions/logout_container";
import { initialState } from "./reducer";
import { currentUser } from "./actions/sessions_action";
import { deleteMessage } from "./actions/messages_action";

type Private = { children: ReactNode; logged_in: boolean; path: string };

const PrivateRoute: FC<Private> = ({ children, logged_in, path }) => {
  return logged_in ? (
    <Route path={path}>{children}</Route>
  ) : (
    <Redirect to="/"></Redirect>
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
  deleteMessage: () => {
    dispatch(deleteMessage.deleteSuccess());
  },
});

type AppProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchProps>;

const App: FC<AppProps> = ({
  logged_in,
  checked,
  message,
  getCurrentUser,
  deleteMessage,
}) => {
  const [menu, changeMenu] = useState(false);
  const [bar, changeBar] = useState(true);
  const [dialogBackground, changeDialogBackground] = useState("none-dialog");
  const [wrapDialog, chnageWrapDialog] = useState("none-wrap-dialog");
  const [dialog, changeDialog] = useState(false);
  useEffect(getCurrentUser, [logged_in]);

  if (!checked) {
    return null;
  }

  return (
    <>
      <CSSTransition in={menu} timeout={1000} classNames="wrapper">
        <div className="wrapper">
          {logged_in ? (
            <header>
              <div className="logo">Book Collection</div>
              <CSSTransition
                in={bar}
                timeout={500}
                classNames="bar"
                unmountOnExit
              >
                <button
                  className="menu-bar"
                  onClick={() => {
                    changeMenu(true);
                  }}
                >
                  <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
                </button>
              </CSSTransition>
            </header>
          ) : null}
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
            <CSSTransition
              in={!!message?.success}
              timeout={3000}
              unmountOnExit
              onEntered={() => deleteMessage()}
              classNames={"message"}
            >
              <div className="message">{message?.success}</div>
            </CSSTransition>
          </div>
        </div>
      </CSSTransition>

      {logged_in ? (
        <CSSTransition
          in={menu}
          timeout={500}
          classNames="menu"
          unmountOnExit
          onEnter={() => {
            changeBar(false);
          }}
          onExit={() => {
            changeBar(true);
          }}
        >
          <div className="menu">
            <button
              className="menu-close"
              onClick={() => {
                changeMenu(false);
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>

            <Link
              to="/books"
              className="menu-link"
              onClick={() => {
                changeMenu(false);
              }}
            >
              本をさがす
            </Link>

            <Link
              to="/mybooks"
              className="menu-link"
              onClick={() => {
                changeMenu(false);
              }}
            >
              MyBooks
            </Link>

            <button
              className="menu-link"
              onClick={() => {
                changeDialogBackground("dialog-background ");
                chnageWrapDialog("wrap-dialog");
                changeDialog(true);
              }}
            >
              Book Collectionとは
            </button>

            <Logout
              style={{
                backgroundColor: "inherit",
                border: "none",
                display: "block",
                marginTop: "20px",
                marginBottom: "0",
                marginRight: "auto",
                marginLeft: "auto",
                fontWeight: "bold",
                color: " rgb(48, 53, 71)",
                outline: "none",
                fontSize: "16px",
              }}
              onClick={() => {
                changeMenu(false);
              }}
            />
          </div>
        </CSSTransition>
      ) : null}

      <div className={dialogBackground}></div>
      <div className={wrapDialog}>
        <CSSTransition
          in={dialog}
          timeout={5000}
          classNames={"dialog"}
          unmountOnExit
        >
          <div className="dialog">
            <CSSTransition
              in={dialog}
              appear={true}
              timeout={7000}
              classNames={"dialog-content"}
            >
              <div className="dialog-content">
                <button
                  className="dialog-close"
                  onClick={() => {
                    changeDialogBackground("none-dialog");
                    chnageWrapDialog("none-wrap-dialog");
                    changeDialog(false);
                  }}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
                <p>
                  自分の好きな本、読みたい本を検索してメモなどをつけながら保存できるサービスです！
                </p>
                <p>また、私がReactを使って初めて開発したものです！</p>
              </div>
            </CSSTransition>
          </div>
        </CSSTransition>
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchProps)(App);
