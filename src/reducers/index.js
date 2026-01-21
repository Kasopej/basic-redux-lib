import { combineReducers } from 'redux';
import todos from "./todos.js";

const todoApp = /** @type {import('redux').Reducer<{todos: typeof todos}>} */ (
  combineReducers({
    todos,
  })
);

export default todoApp;
