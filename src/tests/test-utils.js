import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "../reducer";
import { render } from "@testing-library/react";

export function customState(i) {
  let store = createStore(reducer);
  let customState = { ...store.getState(), ...i };
  return customState;
}

function orgRender(
  ui,
  {
    testInitialState = null,
    store = testInitialState
      ? createStore(reducer, customState(testInitialState))
      : createStore(reducer),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <Router>{children}</Router>
      </Provider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";

export { orgRender as render };
