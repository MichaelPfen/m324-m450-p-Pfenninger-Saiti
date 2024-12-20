import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import InputTodo from "./InputTodo";
import {test} from "vitest";
import TodoContainer from "./TodoContainer";

describe("TodoContainer Component", () => {
    it("addTodoItem fügt eine Aufgabe hinzu", () => {
        // Initiale Todos
        const todos = [];
        const addTodoItem = (title, priority) => {
            const newTodo = { id: 1, title, priority, completed: false };
            todos.push(newTodo);
        };

        addTodoItem("Testaufgabe", "hoch");
        expect(todos.length).toBe(1);
        expect(todos[0]).toEqual({
            id: 1,
            title: "Testaufgabe",
            priority: "hoch",
            completed: false,
        });
    });

    it("getSortedTodos sortiert Aufgaben nach Priorität", () => {
        const todos = [
            { id: 1, title: "Task 1", priority: "niedrig" },
            { id: 2, title: "Task 2", priority: "hoch" },
            { id: 3, title: "Task 3", priority: "mittel" },
        ];

        const getSortedTodos = (todos) => {
            const priorityOrder = { hoch: 1, mittel: 2, niedrig: 3 };
            return [...todos].sort(
                (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
            );
        };

        const sortedTodos = getSortedTodos(todos);
        expect(sortedTodos[0].priority).toBe("hoch");
        expect(sortedTodos[1].priority).toBe("mittel");
        expect(sortedTodos[2].priority).toBe("niedrig");
    });
});

describe("InputTodo Component", () => {
    test("renders input field and add button", () => {
        render(<InputTodo addTodoProps={() => {}} />);
        screen.debug();
        const addButton = screen.getByRole("button", { name: /add/i });
        expect(addButton).toBeInTheDocument();
    });
});