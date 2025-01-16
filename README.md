# Testkonzept für die Todo-Anwendung

## Ziel des Testkonzepts
Das Ziel dieses Testkonzepts ist es, die Funktionalität der Komponenten `TodoContainer`, `InputTodo` und der Hilfsfunktion `highlightTodo` in einer React-Anwendung sicherzustellen. Die Tests sollen gewährleisten, dass die zentralen Features wie Hinzufügen, Sortieren, Hervorheben und Rendern der Todos korrekt funktionieren.

---

## 1. Teststrategie
Die Tests decken die folgenden Aspekte ab:
- **Einheitstests (Unit Tests)**: Überprüfen die Logik von Funktionen und Komponenten in Isolation.
- **Integrationstests**: Testen das Zusammenspiel von Komponenten, insbesondere in der `TodoContainer`-Komponente.
- **UI-Tests**: Validieren das Verhalten und das Erscheinungsbild von UI-Elementen, wie Buttons und Listen.

---

## 2. Testbereiche und Abdeckung

### 2.1. Komponente: TodoContainer
- **Funktionalität: Hinzufügen von Todos**
  - Prüfen, ob ein Todo korrekt hinzugefügt wird.
  - Prüfen, ob das Todo hervorgehoben wird, wenn es am selben Tag fällig ist.
  - Sicherstellen, dass die Benutzerinteraktion (z. B. Eingaben und Klicks) korrekt funktioniert.

- **Funktionalität: Sortierung**
  - Validieren der Sortierung von Todos nach Priorität und Fälligkeitsdatum.
  - Überprüfung, ob die Sortierung korrekt angewendet und in der UI reflektiert wird.

- **Initialzustand**
  - Sicherstellen, dass Todos aus den Initialdaten (`initialTodos`) korrekt geladen und gerendert werden.

### 2.2. Komponente: InputTodo
- **UI-Validierung**
  - Prüfen, ob die Eingabefelder und Buttons korrekt gerendert werden.
  - Sicherstellen, dass die Benutzer Eingaben machen können.

- **Interaktion**
  - Validieren, ob Eingaben im Text- und Datumsfeld korrekt verarbeitet werden.

### 2.3. Hilfsfunktion: highlightTodo
- **Funktionalität**
  - Sicherstellen, dass die Funktion `highlightTodo` korrekte Ergebnisse liefert:
    - Wenn das Datum heute ist.
    - Wenn das Datum in den nächsten 24 Stunden liegt.
    - Wenn das Datum mehr als 24 Stunden in der Zukunft liegt.
    - Wenn das Datum in der Vergangenheit liegt.
    - Wenn kein Datum übergeben wird.

---

## 3. Testfälle

### 3.1. Komponente: TodoContainer

| Test-ID | Beschreibung                               | Art         | Erwartetes Ergebnis                                    |
|---------|-------------------------------------------|-------------|-------------------------------------------------------|
| TC-001  | Hinzufügen eines neuen Todos              | Integration | Das neue Todo wird der Liste hinzugefügt.             |
| TC-002  | Hervorhebung eines Todos mit heutigem Datum | Unit        | Das Todo wird korrekt hervorgehoben.                 |
| TC-003  | Sortierung nach Priorität                 | Unit        | Die Todos sind korrekt nach Priorität sortiert.       |
| TC-004  | Initiale Todos laden und anzeigen         | Integration | Todos aus `initialTodos` werden korrekt gerendert.   |

### 3.2. Komponente: InputTodo

| Test-ID | Beschreibung                               | Art         | Erwartetes Ergebnis                                    |
|---------|-------------------------------------------|-------------|-------------------------------------------------------|
| IT-001  | Eingabefelder und Buttons vorhanden       | UI          | Alle Eingabeelemente werden korrekt gerendert.        |
| IT-002  | Benutzerinteraktion beim Hinzufügen       | Integration | Eingaben und Klicks funktionieren wie erwartet.       |

### 3.3. Hilfsfunktion: highlightTodo

| Test-ID | Beschreibung                                 | Art  | Erwartetes Ergebnis                                    |
|---------|---------------------------------------------|------|-------------------------------------------------------|
| HF-001  | Datum ist heute                              | Unit | Gibt `true` zurück.                                   |
| HF-002  | Datum liegt innerhalb der nächsten 24 Stunden | Unit | Gibt `true` zurück.                                   |
| HF-003  | Datum liegt mehr als 24 Stunden in der Zukunft | Unit | Gibt `false` zurück.                                  |
| HF-004  | Datum liegt in der Vergangenheit             | Unit | Gibt `false` zurück.                                  |
| HF-005  | Kein Datum übergeben                         | Unit | Gibt `false` zurück.                                  |

---

## 4. Testmethodik
- **Testwerkzeuge**: `Vitest` und `React Testing Library`.
- **Ausführung**: Die Tests werden lokal und in CI/CD-Pipelines automatisiert ausgeführt.
- **Metriken**:
  - **Code Coverage**: Ziel ist eine Abdeckung von mindestens 90%.
  - **Fehlerquote**: Maximale akzeptierte Fehlerquote: 5%.

---

## 5. Nicht abgedeckte Bereiche
- Edge-Cases für sehr große Datenmengen (z. B. Tausende von Todos).
- Performance-Tests für das Laden und Rendern der Todos.

---

## 6. Risiken und Annahmen
- **Risiko**: Änderungen in der Logik der Prioritätensortierung könnten bestehende Tests beeinflussen.
- **Annahme**: Die Komponenten werden weiterhin die definierten Props und Struktur beibehalten.

---

## 7. Berichtswesen
Nach jedem Testlauf wird ein Bericht erstellt, der die folgenden Punkte umfasst:
- Anzahl der erfolgreich/nicht erfolgreich bestandenen Tests.
- Fehlermeldungen und betroffene Testfälle.
- Empfehlungen zur Behebung identifizierter Probleme.

---
