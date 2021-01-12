import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import App from "./App";
import vm, { initialState } from "./vm/vm";

const store = createStore(vm, initialState);

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
