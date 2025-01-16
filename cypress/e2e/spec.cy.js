describe("Todo App", () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000'); // Besuche die URL der App
  });

  it('should render the Todo list', () => {
    // Überprüfen, ob das Todo-List-Element vorhanden ist
    cy.get('ul[data-set="todo-list"]').should('exist');
  });

  it('should add a new Todo item', () => {
    // Hinzufügen eines neuen Todo-Items
    cy.get('input[name="title"]').type('Test Todo');
    cy.get('button[type="submit"]').click();

    // Überprüfen, ob das neue Todo angezeigt wird
    cy.get('ul[data-set="todo-list"]').children().should('have.length', 1);
    cy.get('li').first().should('contain', 'Test Todo');
  });

  it('should mark a Todo item as completed', () => {
    // Ein Todo hinzufügen und das erste Todo-Item auswählen
    cy.get('input[name="title"]').type('Test Todo');
    cy.get('button[type="submit"]').click();

    // Überprüfen, dass das Todo nicht abgeschlossen ist
    cy.get('li').first().find('input[type="checkbox"]').should('not.be.checked');

    // Das Todo als erledigt markieren
    cy.get('li').first().find('input[type="checkbox"]').click();

    // Überprüfen, dass das Todo abgeschlossen ist
    cy.get('li').first().find('input[type="checkbox"]').should('be.checked');
  });

  it('should delete a Todo item', () => {
    // Ein Todo hinzufügen
    cy.get('input[name="title"]').type('Test Todo');
    cy.get('button[type="submit"]').click();

    // Überprüfen, ob das Todo existiert
    cy.get('li').should('have.length', 1);

    // Das Todo löschen
    cy.get('li').first().find('button').click();

    // Überprüfen, dass das Todo gelöscht wurde
    cy.get('li').should('have.length', 0);
  });

  it('should filter Todos by category', () => {
    // Todo-Elemente mit verschiedenen Kategorien hinzufügen
    cy.get('input[name="title"]').type('Test Todo - Arbeit');
    cy.get('input[name="category"]').type('Arbeit');
    cy.get('button[type="submit"]').click();

    cy.get('input[name="title"]').type('Test Todo');
    cy.get('input[name="category"]').type('Privat');
    cy.get('button[type="submit"]').click();

    // Kategorien filtern und überprüfen
    cy.get('.category-select').select('Arbeit');
    cy.get('li').should('have.length', 1);
    cy.get('li').first().should('contain', 'Arbeit');

    cy.get('.category-select').select('Privat');
    cy.get('li').should('have.length', 1);
    cy.get('li').first().should('contain', 'Privat');
  });

  it('should sort Todos by priority', () => {
    // Todo-Elemente mit unterschiedlichen Prioritäten hinzufügen
    cy.get('input[name="title"]').type('Test Todo 1');
    cy.get('select[name="priority"]').select('hoch');
    cy.get('button[type="submit"]').click();

    cy.get('input[name="title"]').type('Test Todo 2');
    cy.get('select[name="priority"]').select('niedrig');
    cy.get('button[type="submit"]').click();

    // Nach Priorität sortieren
    cy.get('button').contains('Nach Priorität sortieren').click();

    // Überprüfen, ob die Todos nach Priorität sortiert sind
    cy.get('li').first().should('contain', 'Test Todo 1');
    cy.get('li').last().should('contain', 'Test Todo 2');
  });
});
