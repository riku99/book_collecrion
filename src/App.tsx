import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";

import Books from "./components/books";

const App = () => {
  return (
    <Switch>
      <Route path="/">
        <Books />
      </Route>
    </Switch>
  );
};

export default App;
