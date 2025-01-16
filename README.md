# Testkonzept für die Todo-App

## 1. Einleitung
Dieses Testkonzept beschreibt die Vorgehensweise und Struktur für das Testen der Todo-App im Rahmen des Projekts Module 450 & 324. Ziel ist es, die Softwarequalität zu gewährleisten und systematische Tests gemäß der Testpyramide umzusetzen.

## 2. Testziele
- Sicherstellen, dass die App die Anforderungen der User-Stories erfüllt.
- Validierung der Funktionalität durch verschiedene Testarten (Unit, Integration, End-to-End).
- Sicherstellung der Wartbarkeit und Erweiterbarkeit durch automatisierte Tests.

## 3. Testarten
### 3.1 Unit-Tests
Testen einzelner Funktionen oder Methoden isoliert.
- Beispiel: Prüfung der Funktion `highlightTodo`, ob sie korrekt die Farbmarkierung für fällige Aufgaben setzt.

### 3.2 Integrationstests
Testen des Zusammenspiels mehrerer Module.
- Beispiel: Validierung der Sortierfunktion `getSortedTodos` in Kombination mit der Benutzeroberfläche.

### 3.3 End-to-End-Tests (E2E)
Simulieren des Benutzerverhaltens und Validieren der gesamten App.
- Beispiel: Prüfen, ob ein Benutzer erfolgreich eine Aufgabe hinzufügen, bearbeiten und löschen kann.

## 4. Testpyramide
Die Tests werden nach folgender Priorität umgesetzt:
- **Unit-Tests**: 70 %
- **Integrationstests**: 20 %
- **E2E-Tests**: 10 %

## 5. Testfälle
Die Testfälle sind in der folgenden Tabelle dokumentiert:

| ID  | Testart       | Testbeschreibung                                                                 | Vorbedingung                               | Eingaben                                        | Erwartetes Ergebnis                                         | Nachbedingung                                   |
|-----|---------------|--------------------------------------------------------------------------------|-------------------------------------------|------------------------------------------------|------------------------------------------------------------|------------------------------------------------|
| T1  | Unit-Test     | Überprüfung der Funktion `addTodoItem` fügt eine Aufgabe hinzu.                | Leere Todo-Liste                           | Titel: "Testaufgabe", Priorität: "hoch"       | Aufgabe wird korrekt mit ID, Titel und Priorität hinzugefügt | Todo-Liste enthält die Aufgabe                |
| T2  | Unit-Test     | Sortierung der Todos nach Priorität mit `getSortedTodos`.                       | Liste mit Todos unterschiedlicher Priorität | Keine                                          | Aufgaben werden korrekt nach Priorität sortiert            | Sortierte Liste                                |
| T3  | Integration   | `InputTodo` rendert Eingabefeld und Button.                                     | App ist geladen                            | Keine                                          | Eingabefeld und Button sind sichtbar                        | UI-Elemente korrekt gerendert                 |
| T4  | Integration   | Highlighting einer Aufgabe mit Fälligkeitsdatum heute.                         | Leere Todo-Liste                           | Aufgabe mit Fälligkeitsdatum heute hinzufügen | Aufgabe wird hervorgehoben                                 | Aufgabe ist hervorgehoben                     |
| T5  | E2E-Test      | Hinzufügen einer neuen Aufgabe über die Benutzeroberfläche.                    | App ist geladen                            | Titel: "Neue Aufgabe", Priorität: "mittel"  | Aufgabe erscheint in der Liste                              | Aufgabe ist in der Todo-Liste enthalten        |
| T6  | E2E-Test      | Markieren einer Aufgabe als erledigt.                                           | Aufgabe in der Liste                       | Checkbox markieren                             | Aufgabe wird als erledigt angezeigt                         | Aufgabe ist als erledigt markiert             |
| T7  | E2E-Test      | Löschen einer Aufgabe.                                                          | Aufgabe in der Liste                       | Löschen-Button klicken                         | Aufgabe wird aus der Liste entfernt                         | Aufgabe ist nicht mehr in der Todo-Liste      |
| T8  | E2E-Test      | Filtern der Aufgaben nach Kategorie.                                            | Aufgaben mit unterschiedlichen Kategorien  | Filter "Arbeit" auswählen                      | Nur Aufgaben der Kategorie "Arbeit" sind sichtbar           | Gefilterte Liste                               |
| T9  | E2E-Test      | Sortieren der Aufgaben nach Fälligkeitsdatum.                                   | Aufgaben mit unterschiedlichen Deadlines   | Sortierbutton klicken                          | Aufgaben sind nach Deadlines sortiert                      | Aufgaben sind korrekt sortiert                |

## 6. Testumsetzung
- **Testframeworks**: Jest, Testing Library, Cypress.
- **Testdurchführung**: Alle Unit- und Integrationstests werden lokal ausgeführt. E2E-Tests werden zusätzlich in der GitHub-Pipeline integriert.

## 7. Testabdeckung
Mindestens 80 % der User-Story-Anforderungen werden durch Tests abgedeckt:
- **User-Story 1**: Tests für Priorisierung.
- **User-Story 2**: Tests für Kategorien.
- **User-Story 3**: Tests für Fälligkeitsdatum.

## 8. Dokumentation der Testergebnisse
Die Testergebnisse werden automatisch in der GitHub Actions-Übersicht protokolliert. Fehlerberichte werden bei fehlschlagenden Tests generiert und analysiert.

## 9. Fazit
Durch dieses Testkonzept wird eine systematische Teststrategie umgesetzt, die sowohl die Qualität als auch die Wartbarkeit der Todo-App sicherstellt.

# Testprotokoll

## Projekt: Todo-App Testing
**Datum:** 16.01.2025  
**Ersteller:** Drin Saiti

---

## Übersicht der Testfälle

| **Testfall-ID** | **Komponente**       | **Beschreibung**                                          | **Vorbedingungen**                                | **Eingabe**                                     | **Erwartetes Ergebnis**                                                                                                 | **Nachbedingungen**                              |
|-----------------|----------------------|----------------------------------------------------------|--------------------------------------------------|------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------|
| TC-01           | TodoContainer        | Hinzufügen einer Aufgabe                                 | Leere Liste von Todos                            | Aufgabe "Testaufgabe", Priorität "hoch"       | Aufgabe wird zur Liste hinzugefügt, Liste enthält 1 Element, Aufgabe entspricht der Eingabe                            | Liste enthält die neue Aufgabe                   |
| TC-02           | TodoContainer        | Sortierung der Aufgaben nach Priorität                  | Aufgaben mit Priorität: niedrig, mittel, hoch    | Keine                                           | Aufgaben werden in der Reihenfolge: hoch, mittel, niedrig sortiert                                                    | Aufgabenliste ist sortiert                       |
| TC-03           | InputTodo            | Rendering des Eingabefeldes und Buttons                 | Komponente wird gerendert                        | Keine                                           | Eingabefeld und Button mit Text "Add" sind sichtbar                                                                    | UI ist korrekt gerendert                         |
| TC-04           | highlightTodo        | Hervorhebung von Aufgaben, die heute fällig sind        | Datum der Aufgabe: heute                         | Datum "2025-01-16"                             | Funktion gibt `true` zurück                                                                                           | Keine                                            |
| TC-05           | highlightTodo        | Keine Hervorhebung für Aufgaben ohne Datum              | Aufgabe ohne Fälligkeitsdatum                    | Kein Datum                                      | Funktion gibt `false` zurück                                                                                          | Keine                                            |
| TC-06           | TodoContainer        | Laden von initialen Aufgaben                            | Initiale Aufgabenliste                           | Aufgabenliste mit 2 Elementen                   | Beide Aufgaben sind sichtbar                                                                                          | UI zeigt initiale Aufgaben                       |
| TC-07           | TodoContainer        | Hinzufügen einer neuen Aufgabe mit Highlighting         | Leere Aufgabenliste                              | Aufgabe "New Task", Datum: heute               | Aufgabe wird hinzugefügt und farblich hervorgehoben                                                                    | Neue Aufgabe ist sichtbar und hervorgehoben      |
| TC-08           | TodoContainer        | Sortieren von Aufgaben nach Fälligkeitsdatum            | Aufgaben mit verschiedenen Fälligkeitsdaten     | Keine                                           | Aufgaben sind in aufsteigender Reihenfolge nach Fälligkeitsdatum sortiert                                              | Aufgabenliste ist sortiert                       |
| TC-09           | TodoContainer        | Aufgaben mit Kategorien filtern                         | Aufgaben mit Kategorien Arbeit, Privat           | Filter auf "Arbeit" setzen                     | Nur Aufgaben der Kategorie "Arbeit" sind sichtbar                                                                      | Liste zeigt nur gefilterte Aufgaben              |
| TC-10           | Todo App (E2E)       | Hinzufügen, Markieren und Löschen eines Todos           | App gestartet                                    | Aufgabe hinzufügen, Checkbox markieren, löschen | Aufgabe wird hinzugefügt, als erledigt markiert und anschließend erfolgreich gelöscht                                 | Liste ist leer                                   |

---

## Testergebnisse

| **Testfall-ID** | **Ergebnis**  | **Bemerkungen**                                                               |
|-----------------|--------------|-------------------------------------------------------------------------------|
| TC-01           | Erfolgreich   | Aufgabe wurde korrekt zur Liste hinzugefügt                                   |
| TC-02           | Erfolgreich   | Aufgaben wurden korrekt nach Priorität sortiert                               |
| TC-03           | Erfolgreich   | Eingabefeld und Button wurden korrekt gerendert                               |
| TC-04           | Erfolgreich   | Aufgaben mit heutigem Datum wurden korrekt hervorgehoben                      |
| TC-05           | Erfolgreich   | Aufgaben ohne Datum wurden nicht hervorgehoben                                |
| TC-06           | Erfolgreich   | Initiale Aufgaben wurden erfolgreich geladen                                  |
| TC-07           | Erfolgreich   | Neue Aufgabe wurde hinzugefügt und korrekt hervorgehoben                      |
| TC-08           | Erfolgreich   | Aufgaben wurden korrekt nach Fälligkeitsdatum sortiert                        |
| TC-09           | Erfolgreich   | Filterfunktion für Kategorien hat korrekt funktioniert                         |
| TC-10           | Erfolgreich   | End-to-End-Test: Hinzufügen, Markieren und Löschen hat wie erwartet funktioniert |

---

**Zusammenfassung:**  
Alle Tests wurden erfolgreich durchgeführt, und die Akzeptanzkriterien der User-Stories wurden erfüllt.

