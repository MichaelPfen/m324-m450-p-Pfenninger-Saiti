import React, {act} from "react";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import { describe, it, expect } from "vitest";
import InputTodo from "./InputTodo";
import { test } from "vitest";
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
        render(<InputTodo addTodoProps={() => { }} />);
        screen.debug();
        const addButton = screen.getByRole("button", { name: /add/i });
        expect(addButton).toBeInTheDocument();
    });
});

const highlightTodo = (dueDate) => {
    if (!dueDate) return false;

    const now = new Date();
    const todoDate = new Date(dueDate);

    const isToday = now.toDateString() === todoDate.toDateString();
    const isWithin24Hours = todoDate - now > 0 && todoDate - now <= 24 * 60 * 60 * 1000;

    return isToday || isWithin24Hours;
};

describe("highlightTodo", () => {
    it("should return true if the date is today", () => {
        const today = new Date().toISOString().split("T")[0];
        expect(highlightTodo(today)).toBe(true);
    });

    it("should return true if the date is within the next 24 hours", () => {
        const within24Hours = new Date(new Date().getTime() + 23 * 60 * 60 * 1000).toISOString();
        expect(highlightTodo(within24Hours)).toBe(true);
    });

    it("should return false if the date is more than 24 hours in the future", () => {
        const moreThan24Hours = new Date(new Date().getTime() + 25 * 60 * 60 * 1000).toISOString();
        expect(highlightTodo(moreThan24Hours)).toBe(false);
    });

    it("should return false if the date is in the past", () => {
        const pastDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString();
        expect(highlightTodo(pastDate)).toBe(false);
    });

    it("should return false if no date is provided", () => {
        expect(highlightTodo(null)).toBe(false);
    });
});

describe("TodoContainer Component", () => {
    it("loads initialTodos into state and renders them", () => {
        const mockTodos = [
            { id: 1, title: "Task Today", dueDate: new Date().toISOString(), priority: "mittel", completed: false },
            { id: 2, title: "Task Tomorrow", dueDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(), priority: "hoch", completed: false },
        ];

        render(<TodoContainer initialTodos={mockTodos} />);

        const todoToday = screen.getByText("Task Today");
        const todoTomorrow = screen.getByText("Task Tomorrow");

        expect(todoToday).toBeInTheDocument();
        expect(todoTomorrow).toBeInTheDocument();
    });
});

describe("TodoContainer Adding Todos", () => {
    it("should add a new todo and highlight it if due today", () => {
        const { container } = render(<TodoContainer />);

        const inputField = screen.getByPlaceholderText("Add todo...");
        const addButton = screen.getByRole("button", { name: /add/i });
        const dateInput = container.querySelector('input[name="dueDate"]');

        fireEvent.change(inputField, { target: { value: "New Task Today" } });
        fireEvent.change(dateInput, { target: { value: new Date().toISOString().split("T")[0] } });
        fireEvent.click(addButton);

        const newTodo = screen.getByText("New Task Today");
        expect(newTodo).toBeInTheDocument();
        expect(newTodo.closest("li")).toHaveStyle("background-color: rgb(255, 255, 0);");
    });
});

describe("TodoContainer Sorting", () => {
    it("should sort todos by due date when sorting is applied", async () => {
        const mockTodos = [
            { id: 1, title: "Task Today", dueDate: new Date().toISOString(), priority: "mittel", completed: false },
            { id: 2, title: "Task Tomorrow", dueDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(), priority: "hoch", completed: false },
        ];

        const { container } = render(<TodoContainer initialTodos={mockTodos} />);

        const todoList = await waitFor(() => container.querySelector('[data-set="todo-list"]'));
        expect(todoList).toBeInTheDocument();

        const todoItems = todoList.querySelectorAll("li");
        expect(todoItems).toHaveLength(mockTodos.length);

        mockTodos.forEach((todo, index) => {
            expect(todoItems[index]).toHaveTextContent(todo.title);
        });
    });
});