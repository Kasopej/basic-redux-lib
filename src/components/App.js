import React from 'react';
import Footer from "./Footer.js";
import AddTodo from "./AddTodo.js";
import VisibleTodoList from "./VisibleTodoList.js";

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

export default App;
