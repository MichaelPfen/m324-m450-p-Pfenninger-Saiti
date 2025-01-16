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

        screen.debug();

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

describe("Category Functionality in TodoContainer", () => {
    it("should add a new todo with a category", () => {
        const { container } = render(<TodoContainer initialTodos={[]} />);

        // Zugriff auf das Eingabefeld für den Titel
        const inputField = screen.getByPlaceholderText("Add todo...");
        const addButton = screen.getByRole("button", { name: /add/i });

        // Simuliere das Hinzufügen eines neuen Todos
        fireEvent.change(inputField, { target: { value: "New Task with Category" } });

        // Kategorie auswählen
        const categoryDropdown = container.querySelector("select");
        fireEvent.change(categoryDropdown, { target: { value: "Arbeit" } });

        // Fälligkeitsdatum setzen (optional, falls vorhanden)
        const dateInput = container.querySelector('input[name="dueDate"]');
        fireEvent.change(dateInput, { target: { value: "2025-01-10" } });

        // Button klicken, um das Todo hinzuzufügen
        fireEvent.click(addButton);

        // Prüfung, ob das neue Todo angezeigt wird
        const newTodo = screen.getByText("New Task with Category");
        expect(newTodo).toBeInTheDocument();

        // Prüfung der Kategorie
        const categoryText = screen.getByText(/Arbeit/);
        expect(categoryText).toBeInTheDocument();
    });

    it("should show all todos when category filter is cleared", () => {
        const mockTodos = [
            { id: 1, title: "Work Task", category: "Arbeit", priority: "hoch", dueDate: "2025-01-09", completed: false },
            { id: 2, title: "Private Task", category: "Privat", priority: "mittel", dueDate: "2025-01-10", completed: false },
        ];

        render(<TodoContainer initialTodos={mockTodos} />);

        const filterSelect = screen.getByText("Alle Kategorien").closest("select");
        fireEvent.change(filterSelect, { target: { value: "Arbeit" } }); // Filter auf "Arbeit" setzen
        fireEvent.change(filterSelect, { target: { value: "" } }); // Filter löschen

        // Beide Todos sollten sichtbar sein
        expect(screen.getByText("Work Task")).toBeInTheDocument();
        expect(screen.getByText("Private Task")).toBeInTheDocument();
    });

    it("should allow updating the category of a todo", () => {
        const mockTodos = [
            { id: 1, title: "Update Category Task", category: "Einkäufe", priority: "niedrig", dueDate: "2025-01-11", completed: false },
        ];

        render(<TodoContainer initialTodos={mockTodos} />);

        const categoryInput = screen.getByDisplayValue("Einkäufe"); // Aktuelle Kategorie
        fireEvent.change(categoryInput, { target: { value: "Arbeit" } });

        // Kategorie sollte aktualisiert sein
        const updatedCategorySpan = screen.getByText(/Kategorie: Arbeit/);
        expect(updatedCategorySpan).toBeInTheDocument();
    });
});