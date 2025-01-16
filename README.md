# Testkonzept für die Todo-App

Dieses Dokument beschreibt das Testkonzept für die Todo-App. Ziel ist es, die Qualität der Anwendung sicherzustellen, indem alle Funktionalitäten gründlich geprüft werden.

---

## 1. Zielsetzung

- Sicherstellen, dass alle Funktionen der Todo-App gemäß den Anforderungen und Spezifikationen korrekt arbeiten.
- Identifizieren und Beheben von Bugs oder Inkonsistenzen in der Anwendung.
- Sicherstellen, dass die Benutzererfahrung reibungslos und intuitiv ist.

---

## 2. Testbereiche

### 2.1. Funktionale Tests

#### Komponenten
- **InputTodo**: Testen von Eingabevalidierungen, Hinzufügen von Aufgaben.
- **TodoContainer**: Testen von Sortierung, Filterung, Highlighting und Rendering.

#### Features
- Hinzufügen, Löschen und Bearbeiten von Todos.
- Filtern nach Kategorien und Sortieren nach Prioritäten.
- Markieren von Todos als erledigt.
- Highlighten von Todos mit bestimmten Bedingungen (z. B. Fälligkeitsdatum).

### 2.2. Nicht-funktionale Tests

#### Performance-Tests
- Reaktionszeit beim Hinzufügen, Filtern und Sortieren von Todos.

#### Usability-Tests
- Überprüfung der Benutzerfreundlichkeit (UX/UI).

#### Kompatibilität
- Testen der App in verschiedenen Browsern (Chrome, Firefox, Edge, Safari).

---

## 3. Testarten

### 3.1. Unit Tests
- **Tools**: Jest, React Testing Library
- **Fokus**:
  - Einzelne Funktionen und Komponenten:
    - `addTodoItem`: Fügt eine Aufgabe hinzu.
    - `getSortedTodos`: Sortiert Aufgaben basierend auf Priorität.
    - `highlightTodo`: Markiert Todos abhängig von Bedingungen.

### 3.2. Integrationstests
- **Tools**: React Testing Library
- **Fokus**:
  - Zusammenspiel mehrerer Komponenten, z. B. `InputTodo` und `TodoContainer`.
  - Übergabe von Props und Zustandshandhabung.

### 3.3. End-to-End (E2E) Tests
- **Tools**: Cypress
- **Fokus**:
  - Vollständige Benutzerabläufe:
    - Todos hinzufügen, löschen, bearbeiten.
    - Filter und Sortierungen anwenden.
    - Validierung der App-Funktionen im Browser.

---

## 4. Teststrategie

### 4.1. Testabdeckung
- **Funktionalität**: 100% Testabdeckung für alle kritischen Funktionen (z. B. Hinzufügen und Löschen von Todos).
- **Benutzerflüsse**: Abdecken der wichtigsten User Journeys (z. B. neues Todo erstellen, nach Kategorie filtern).
- **Randfälle**: Testen von Randbedingungen (z. B. leere Eingaben, ungültige Daten).

### 4.2. Testfälle

#### Unit Testfälle
- Hinzufügen von Todos (Titel und Priorität).
- Sortierung von Todos nach Priorität.
- Highlighting basierend auf Fälligkeitsdatum.

#### Integration Testfälle
- Interaktion zwischen `InputTodo` und `TodoContainer`.
- Prüfen, ob Todos korrekt im Container gerendert werden.

#### E2E Testfälle
- Benutzer öffnet die App, erstellt ein Todo, markiert es als erledigt und löscht es.
- Anwenden von Filter- und Sortierfunktionen.

---

## 5. Tools und Frameworks

### 5.1. Unit & Integration Testing
- **Framework**: Vitest, Jest
- **Bibliothek**: React Testing Library

### 5.2. End-to-End Testing
- **Framework**: Cypress

### 5.3. Testdatengenerierung
- Verwendung von Mock-Daten für Unit- und Integrationstests.

---

## 6. Testumgebung

- **Browser**: Chrome, Firefox, Edge, Safari.
- **Plattformen**: Desktop (Windows, macOS), Mobile (iOS, Android – falls relevant).
- **CI/CD Pipeline**: Automatische Ausführung der Tests bei Änderungen im Code (GitHub Actions, Jenkins o. Ä.).

---

## 7. Testdurchführung

### 7.1. Vorbedingungen
- Testumgebung einrichten.
- Sicherstellen, dass alle Abhängigkeiten korrekt installiert sind.

### 7.2. Testausführung
1. **Unit Tests**: Lokale Ausführung mit Vitest.
2. **Integration Tests**: Lokale Ausführung und CI-Pipeline.
3. **E2E Tests**: Cypress-Tests in einer Testumgebung.

### 7.3. Testprotokoll
- Automatisches Protokollieren von Testergebnissen in der CI/CD Pipeline.
- Berichte über Testabdeckung.

---

## 8. Erfolgskriterien

- Alle kritischen Tests bestehen (keine Blocker).
- Funktionale Tests decken alle Haupt-Features ab.
- E2E Tests simulieren erfolgreich reale Benutzerabläufe.

---
