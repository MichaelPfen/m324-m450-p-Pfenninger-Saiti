'use client'

import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "./Header";
import InputTodo from "./InputTodo";
import TodosList from "./TodosList";
import styles from "./TodoContainer.module.css";
const TodoContainer = ({ initialTodos = [] }) => {
  const [todos, setTodos] = useState(initialTodos);
  const [sortOption, setSortOption] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");  // Filter für Kategorie

  const getInitialTodos = () => {
    const temp = localStorage.getItem("todos");
    const savedTodos = JSON.parse(temp);
    return savedTodos || [];
  };

  useEffect(() => {
    getInitialTodos();
  }, []);

  const handleChange = (id) => {
    setTodos((prevState) =>
      prevState.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      })
    );
  };

  const delTodo = (id) => {
    setTodos([...todos.filter((todo) => todo.id !== id)]);
  };

  const addTodoItem = (title, priority = "mittel", dueDate, category = "") => {
    const newTodo = {
      id: uuidv4(),
      title,
      priority,
      dueDate,
      category,  // Kategorie hinzufügen
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const setUpdate = (field, value, id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            [field]: value, // Dynamische Aktualisierung des Feldes (title oder priority)
          };
        }
        return todo;
      })
    );
  };

  const getSortedTodos = () => {
    if (!sortOption) {
      return todos; // Keine Sortierung
    }

    return [...todos].sort((a, b) => {
      if (sortOption === "priority") {
        const priorityOrder = { hoch: 1, mittel: 2, niedrig: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      if (sortOption === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  };

  const getFilteredTodos = () => {
    if (categoryFilter) {
      return todos.filter((todo) => todo.category === categoryFilter);  // Filtern nach Kategorie
    }
    return todos;
  };


  // storing todos items
  useEffect(() => {
    const temp = JSON.stringify(todos);
    localStorage.setItem("todos", temp);
  }, [todos]);

  return (
    <div className={styles.inner}>
      <Header />
      <InputTodo addTodoProps={addTodoItem} />
      <div className="filter-container">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">Alle Kategorien</option>
          <option value="Arbeit">Arbeit</option>
          <option value="Privat">Privat</option>
          <option value="Einkäufe">Einkäufe</option>
          {/* Füge hier alle möglichen Kategorien hinzu */}
        </select>

      </div>
      <TodosList
        todos={getFilteredTodos()}
        handleChangeProps={handleChange}
        deleteTodoProps={delTodo}
        setUpdate={setUpdate}
      />
      <div className="button-container">
        <button
          onClick={() => setSortOption("priority")}
        >
          Nach Priorität sortieren
        </button>
        <button
          onClick={() => setSortOption("title")}
        >
          Nach Titel sortieren
        </button>
        <button
          onClick={() => setSortOption(null)}
        >
          Keine Sortierung
        </button>
      </div>
    </div>
  );
};

export default TodoContainer;
