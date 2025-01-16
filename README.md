# Testkonzept für die Todo-App

Das Testkonzept für die Todo-App definiert die Teststrategie, Testbereiche, Testarten und die zu verwendenden Tools und Frameworks. Ziel ist es, die Qualität der Anwendung sicherzustellen, indem alle Funktionalitäten gründlich geprüft werden.

---

## 1. Zielsetzung

- Sicherstellen, dass alle Funktionen der Todo-App gemäß den Anforderungen und Spezifikationen korrekt arbeiten.
- Identifizieren und Beheben von Bugs oder Inkonsistenzen in der Anwendung.
- Sicherstellen, dass die Benutzererfahrung reibungslos und intuitiv ist.

---

## 2. Testbereiche

### 2.1. Funktionale Tests
| **Komponenten**   | **Tests**                                                                 |
|-------------------|--------------------------------------------------------------------------|
| `InputTodo`       | Testen von Eingabevalidierungen, Hinzufügen von Aufgaben                |
| `TodoContainer`   | Testen von Sortierung, Filterung, Highlighting und Rendering            |

| **Features**      | **Tests**                                                                 |
|-------------------|--------------------------------------------------------------------------|
| Hinzufügen        | Hinzufügen neuer Todos mit Titel, Priorität und optionalen Kategorien   |
| Löschen           | Entfernen von Todos aus der Liste                                       |
| Bearbeiten        | Aktualisieren bestehender Todos                                        |
| Filtern           | Todos nach Kategorien filtern                                           |
| Sortieren         | Todos nach Prioritäten sortieren                                        |
| Highlighting      | Markieren von Todos, die bestimmte Bedingungen erfüllen (z. B. Fälligkeitsdatum) |

### 2.2. Nicht-funktionale Tests
| **Bereich**        | **Beschreibung**                                                         |
|--------------------|-------------------------------------------------------------------------|
| Performance        | Reaktionszeit beim Hinzufügen, Filtern und Sortieren von Todos         |
| Usability          | Überprüfung der Benutzerfreundlichkeit (UX/UI)                        |
| Kompatibilität     | Testen der App in verschiedenen Browsern (Chrome, Firefox, Edge, Safari) |

---

## 3. Testarten

### 3.1. Unit Tests
- **Tools:** Jest, React Testing Library
- **Fokus:**
  - Einzelne Funktionen und Komponenten, wie:
    - `addTodoItem`: Fügt eine Aufgabe hinzu.
    - `getSortedTodos`: Sortiert Aufgaben basierend auf Priorität.
    - `highlightTodo`: Markiert Todos abhängig von Bedingungen.

### 3.2. Integrationstests
- **Tools:** React Testing Library
- **Fokus:**
  - Zusammenspiel mehrerer Komponenten, z. B. `InputTodo` und `TodoContainer`.
  - Übergabe von Props und Zustandshandhabung.

### 3.3. End-to-End (E2E) Tests
- **Tools:** Cypress
- **Fokus:**
  - Vollständige Benutzerabläufe:
    - Todos hinzufügen, löschen, bearbeiten.
    - Filter und Sortierungen anwenden.
    - Validierung der App-Funktionen im Browser.

---

## 4. Teststrategie

### 4.1. Testabdeckung
| **Bereich**          | **Ziel**                                                              |
|----------------------|----------------------------------------------------------------------|
| Funktionalität       | 100% Testabdeckung für alle kritischen Funktionen                   |
| Benutzerflüsse       | Abdecken der wichtigsten User Journeys                              |
| Randfälle            | Testen von Randbedingungen (z. B. leere Eingaben, ungültige Daten)  |

### 4.2. Testfälle
| **Testtyp**          | **Beispiele**                                                        |
|----------------------|----------------------------------------------------------------------|
| Unit Testfälle       | Hinzufügen, Sortieren und Highlighten von Todos                     |
| Integration Testfälle| Zusammenspiel von `InputTodo` und `TodoContainer`                   |
| E2E Testfälle        | Benutzer öffnet die App, erstellt ein Todo, markiert es als erledigt und löscht es |

---

## 5. Tools und Frameworks

| **Testart**          | **Tools**                                                            |
|----------------------|----------------------------------------------------------------------|
| Unit & Integration   | Vitest, Jest, React Testing Library                                  |
| End-to-End Testing   | Cypress                                                             |
| Testdatengenerierung | Mock-Daten für Unit- und Integrationstests                          |

---

## 6. Testumgebung

| **Aspekt**           | **Details**                                                         |
|----------------------|----------------------------------------------------------------------|
| Browser              | Chrome, Firefox, Edge, Safari                                       |
| Plattformen          | Desktop (Windows, macOS), Mobile (iOS, Android – falls relevant)    |
| CI/CD Pipeline       | Automatische Ausführung der Tests bei Änderungen im Code (GitHub Actions, Jenkins o. Ä.) |

---

## 7. Testdurchführung

### 7.1. Vorbedingungen
- Testumgebung einrichten.
- Sicherstellen, dass alle Abhängigkeiten korrekt installiert sind.

### 7.2. Testausführung
1. **Unit Tests:** Lokale Ausführung mit Vitest.
2. **Integration Tests:** Lokale Ausführung und CI-Pipeline.
3. **E2E Tests:** Cypress-Tests in einer Testumgebung.

### 7.3. Testprotokoll
- Automatisches Protokollieren von Testergebnissen in der CI/CD Pipeline.
- Berichte über Testabdeckung.

---

## 8. Erfolgskriterien

- Alle kritischen Tests bestehen (keine Blocker).
- Funktionale Tests decken alle Haupt-Features ab.
- E2E Tests simulieren erfolgreich reale Benutzerabläufe.

---
