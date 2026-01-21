import { toggleTodo } from "../actions/index.js";
import TodoList from "./TodoList.js";
import connectedComponent from "../hocs/connected-component.js";
import { withRouter } from "react-router";
import { connect } from "react-redux";

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case "all":
      return todos;
    case "completed":
      return todos.filter((t) => t.completed);
    case "active":
      return todos.filter((t) => !t.completed);
    default:
      throw new Error(`Unknown filter: ${filter}.`);
  }
};

const mapStateToProps = (state, { params }) => {
  return {
    todos: getVisibleTodos(state.todos, params.filter || "all"),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id));
    },
  };
};

const VisibleTodoList = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TodoList)
);

export default VisibleTodoList;
