import { combineReducers } from "../store/utils.js";
import todos from "./todos.js";

/**
 * @typedef {import("../store/utils.js").Action} Action
 */

/**
 * @typedef {{todos: ReturnType<typeof todos>}} RootState
 */
/**
 * @typedef {(state: RootState, action: Action) => RootState} RootReducer
 */

const todoApp = /** @type {RootReducer} */ (
  combineReducers({
    todos,
  })
);

export default todoApp;
