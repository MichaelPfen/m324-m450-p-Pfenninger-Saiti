/* eslint react/prop-types: 0 */
import React from "react";
import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import styles from "./TodoItem.module.css";

const TodoItem = (props) => {
  const [editing, setEditing] = useState(false);

  const handleEditing = () => {
    setEditing(true);
  };

  const handleUpdatedDone = (event) => {
    if (event.key === "Enter") {
      setEditing(false);
    }
  };

  const highlightTodo = (dueDate) => {
    if (!dueDate) return false;

    const now = new Date();
    const todoDate = new Date(dueDate);

    const isToday = now.toDateString() === todoDate.toDateString();
    const isWithin24Hours = todoDate - now > 0 && todoDate - now <= 24 * 60 * 60 * 1000;

    return isToday || isWithin24Hours;
  };

  const highlightStyle = {
    backgroundColor: highlightTodo(props.todo.dueDate) ? "yellow" : "transparent",
  };

  const completedStyle = {
    fontStyle: "italic",
    color: "#595959",
    opacity: 0.4,
    textDecoration: "line-through",
  };

  const { completed, id, title, category } = props.todo;

  const viewMode = {};
  const editMode = {};

  if (editing) {
    viewMode.display = "none";
  } else {
    editMode.display = "none";
  }

  const priorityStyle = {
    hoch: { color: "red", fontWeight: "bold" },
    mittel: { color: "orange" },
    niedrig: { color: "green" },
  };

    return (
        <li className={styles.item} style={highlightStyle}>
            <div onDoubleClick={handleEditing} style={viewMode}>
                <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={completed}
                    onChange={() => props.handleChangeProps(id)}
                />
                <span style={priorityStyle[props.todo.priority]}>{`[${props.todo.priority}]`}</span>
                <span style={completed ? completedStyle : null}>{title}</span><br/>
                <span>{category && `Kategorie: ${category} `}</span>
                <span>{props.todo.dueDate ? `Fällig: ${props.todo.dueDate}` : ""}</span>
                <button onClick={() => props.deleteTodoProps(id)}>
                    <FaTrash style={{ color: "orangered", fontSize: "16px" }} />
                </button>
            </div>
            <input
                type="text"
                style={editMode}
                className={styles.textInput}
                value={title}
                onChange={(e) => props.setUpdate("title", e.target.value, id)}
                onKeyDown={handleUpdatedDone}
            />
            <select
                value={props.todo.priority}
                onChange={(e) => props.setUpdate("priority", e.target.value, id)}
                className={styles.prioritySelect}
            >
                <option value="hoch">Hoch</option>
                <option value="mittel">Mittel</option>
                <option value="niedrig">Niedrig</option>
            </select>
            <input
                type="date"
                name="dueDate"
                value={props.todo.dueDate || ""}
                onChange={(e) => props.setUpdate("dueDate", e.target.value, id)}
                className={styles.dateInput}
            />
            <input
                type="text"
                value={props.todo.category || ""}
                onChange={(e) => props.setUpdate("category", e.target.value, id)}  // Kategorie aktualisieren
                className={styles.categoryInput}
                placeholder={"Kategorie"}
            />
        </li>
    );
};

export default TodoItem;
