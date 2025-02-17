/* eslint react/prop-types: 0 */
import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";

const InputTodo = (props) => {
  const [inputText, setInputText] = useState({
    title: "",
    priority: "mittel",
    dueDate: "",
    category: "",  // Neue Kategorie
  });

  const onChange = (e) => {
    setInputText({
      ...inputText,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.title.trim()) {
      props.addTodoProps(inputText.title, inputText.priority, inputText.dueDate, inputText.category);  // Kategorie beim Erstellen mitgeben
      setInputText({
        title: "",
        priority: "mittel",
        dueDate: "",
        category: "",  // Zurücksetzen der Kategorie
      });
    } else {
      alert("Please write item");
    }
  };

  return (
    <form
      data-set="todo-form"
      onSubmit={handleSubmit}
      className="form-container"
    >
      <input
        type="text"
        className="input-text"
        placeholder="Add todo..."
        value={inputText.title}
        name="title"
        onChange={onChange}
      />
      <select
        name="priority"
        value={inputText.priority}
        onChange={onChange}
        className="priority-select"
      >
        <option value="hoch">Hoch</option>
        <option value="mittel">Mittel</option>
        <option value="niedrig">Niedrig</option>
      </select>
      <input
        type="date"
        name="dueDate"
        value={inputText.dueDate}
        onChange={onChange}
        className="input-date"
      />
      <input
        type="text"
        name="category"  // Kategorie-Input
        value={inputText.category}
        onChange={onChange}
        placeholder="Kategorie"
        className="category-input"
      />
      <button
        data-set="add-todo-btn"
        className="input-submit"
        aria-label="add"
        type={"submit"}
      >
        <FaPlusCircle/>
      </button>
    </form>
  );
};

export default InputTodo;