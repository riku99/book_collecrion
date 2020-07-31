import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";

import Books from "./container/books_container";
import MyBook from "./container/mybooks_container";

const App = () => {
  return (
    <>
      <header></header>
      <div className="wrapper">
        <div className="container">
          <Switch>
            <Route path="/mybooks">
              <MyBook />
            </Route>
            <Route path="/">
              <Books />
            </Route>
          </Switch>
        </div>
      </div>
      <footer></footer>
    </>
  );
};

export default App;
