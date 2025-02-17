/* eslint react/prop-types: 0 */
import TodoItem from "./TodoItem";
import React from "react";

const TodosList = (props) => (
  <ul data-set="todo-list">
    {props.todos.map((todo) => (
      <TodoItem
        key={todo.id}
        todo={todo}
        handleChangeProps={props.handleChangeProps}
        deleteTodoProps={props.deleteTodoProps}
        setUpdate={props.setUpdate}
      />
    ))}
  </ul>
);
export default TodosList;
