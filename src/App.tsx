import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";

import Books from "./container/books_container";

const App = () => {
  return (
    <>
      <header></header>
      <Switch>
        <Route path="/">
          <Books />
        </Route>
      </Switch>
      <footer></footer>
    </>
  );
};

export default App;
