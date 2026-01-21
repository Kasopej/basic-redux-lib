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
 * @typedef {import("./store/utils.js").Action} Action
 * @typedef {import("./store/utils.js").Middleware<ReturnType<typeof todoApp>>} Middleware
 */

/**
 * @type {Middleware}
 */
const loggerMiddleware = (store) => (next) => {
  return (action) => {
    const actionObject = /** @type {Action} */ (action);
    console.log("before action", actionObject.type, store.getState());
    const state = next(/** @type {Action} */ (actionObject));
    console.log("after action", actionObject.type, store.getState());
    return state;
  };
};

/**
 * @type {Middleware}
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
 * @param {string} dataString
 * @returns {ReturnType<typeof todoApp>}
 */
function getInitialState(dataString) {
  let output = undefined;
  try {
    output = JSON.parse(dataString);
  } catch (error) {}
  return output;
}
const middlewares = [resolveMiddleware, loggerMiddleware];
const initialStoreState = getInitialState(localStorage.getItem("state") || "");
const store = createStore(
  todoApp,
  initialStoreState,
  applyMiddlewares(middlewares),
);

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
