// import 'babel-polyfill';
import React from "react";
// @ts-ignore
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import todoApp from "./reducers/index.js";
import App from "./components/App.js";
import { Router, Route } from "react-router";
import { browserHistory } from "react-router";
import { applyMiddlewares } from "./store/utils.js";

/**
 * @type {import("./store/utils.js").Middleware<ReturnType<typeof todoApp>>}
 */
const loggerMiddleware = (store) => (next) => {
  return (action) => {
    console.log("before action", action, store.getState());
    const state = next(
      /** @type {import("./store/utils.js").Action} */ (action),
    );
    console.log("after action", action, store.getState());
    return state;
  };
};

/**
 * @type {import("./store/utils.js").Middleware<ReturnType<typeof todoApp>>}
 */
const resolveMiddleware = (store) => (next) => {
  return (action) => {
    if (action instanceof Promise) {
      return action.then(next);
    }
    return next(action);
  };
};

/**
 * Tries to parse the given data string into a JSON object.
 * If there is a parsing error, it returns null.
 * @param {string} dataString - The string to parse into a JSON object
 * @returns {ReturnType<typeof todoApp>} - The parsed JSON object, or null if there was an error
 */
function getInitialState(dataString) {
  let output = undefined;
  try {
    output = JSON.parse(dataString);
  } catch (error) {}
  return output;
}
const initialStoreState = getInitialState(localStorage.getItem("state") || "");
const store = createStore(todoApp, initialStoreState);
const middlewares = [resolveMiddleware, loggerMiddleware];
applyMiddlewares(store, middlewares);

const fakeAsyncAction = () =>
  new Promise((resolve) => {
    resolve({
      type: "ADD_TODO",
      id: "100",
      text: "Async",
      completed: false,
    });
  });

store.dispatch(/** @type {any} */ (fakeAsyncAction()));

render(
  // @ts-ignore
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/(:filter)" component={App} />
    </Router>
  </Provider>,
  document.getElementById("root"),
);
