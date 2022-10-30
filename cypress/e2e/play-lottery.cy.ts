import {USER_PASSWORD_MAP, USERS} from "../../src/app/modules/authentication/constants";
import {User} from "../../src/app/modules/authentication/models/user";

describe('Lottery test', () => {

  it('can play lottery', () => {
    cy.visit('/');
    cy.title().should('equal', 'Lottery');
    cy.contains('Please log in:')

    const user: User = USERS[0];
    const password: string = USER_PASSWORD_MAP.get(user.userId) || '';

    cy.get('#userId').type(user.userId.toString());
    cy.get('#password').type(password);
    cy.get('#login-button').click();

    cy.contains('Logged in user:');
    cy.get('#user-name').should('have.text', user.userName);

    cy.get('.lottery-input-panel').each(($panel) => {
      cy.wrap($panel).find('.random-button').click({force: true});
    });
    cy.get('#play-button').click();

    cy.get('#result-panel').should('be.visible');
    cy.get('#result-panel').should('contain.text', 'Panel');
  });

})
