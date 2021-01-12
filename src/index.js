import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";

import App from "./App";
import vmReducer from "./vmReducer";

const logger = (store) => (next) => (action) => {
  console.log("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  return result;
};

const store = createStore(
  vmReducer,
  { pc: 0, sp: 0, fp: 0, ep: 0, store: {} }
  // applyMiddleware(logger)
);

const WrappedApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const rootElement = document.getElementById("root");
const renderApp = () =>
  ReactDOM.render(
    <React.StrictMode>
      <WrappedApp />
    </React.StrictMode>,
    rootElement
  );

if (process.env.NODE_ENV !== "production" && module.hot) {
  module.hot.accept(renderApp);
}

renderApp();
