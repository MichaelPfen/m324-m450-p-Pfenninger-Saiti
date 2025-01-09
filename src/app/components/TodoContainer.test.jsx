import React from "react";
import { render, screen } from "@testing-library/react";
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

    it("sollte Aufgaben nach Kategorie filtern", () => {
        const todos = [
            { id: 1, title: "Task 1", priority: "hoch", category: "Arbeit" },
            { id: 2, title: "Task 2", priority: "mittel", category: "Privat" },
            { id: 3, title: "Task 3", priority: "niedrig", category: "Arbeit" },
        ];

        // Simuliere den Filter "Arbeit"
        const categoryFilter = "Arbeit";
        const filteredTodos = todos.filter(todo => todo.category === categoryFilter);

        expect(filteredTodos.length).toBe(2);  // Es sollten 2 Aufgaben mit der Kategorie "Arbeit" sein
        expect(filteredTodos[0].category).toBe("Arbeit");
        expect(filteredTodos[1].category).toBe("Arbeit");
    });

    it("zeigt alle Aufgaben, wenn der Filter auf 'Alle Kategorien' gesetzt wird", () => {
        render(<TodoContainer />);

        // Setze den Filter auf "Alle Kategorien"
        const categoryDropdown = screen.getByRole("combobox");
        fireEvent.change(categoryDropdown, { target: { value: "" } });

        // Überprüfen, ob alle Aufgaben angezeigt werden
        const allTasks = screen.getAllByText(/Task/);
        expect(allTasks.length).toBe(3);  // Alle Aufgaben sollten angezeigt werden, wenn der Filter entfernt wurde
    });

});


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