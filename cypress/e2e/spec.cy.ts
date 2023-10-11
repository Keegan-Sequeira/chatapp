import "cypress-localstorage-commands";

describe('Test Login, Signup, and Logout Functions', () => {
  beforeEach(() => {
    cy.visit("/");
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  })

  it('incorrect login - alert should be generated', () => {

    // Open login page
    cy.get(".nav-link").contains("Login").click();

    // Fill in the form
    cy.get("#username").type("super");
    cy.get("#password").type("321");

    // Submit the form
    cy.get("#login-button").click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Incorrect username or password`);
    });
  })

  it("should create new user from sign up", () => {

    // Open sign up page
    cy.get(".nav-link").contains("Signup").click();

    // Fill in the form
    cy.get("#email").type("testing@chatlink.com");
    cy.get("#username").type("test_user");
    cy.get("#password").type("Password1");

    // Submit the form
    cy.get("#signup-button").click();

    cy.location("pathname", {timeout: 60000}).should("equal", "/");

    cy.window().then((win) => {
      expect(localStorage.getItem("valid")).to.equal("true");
      expect(localStorage.getItem("username")).to.equal("test_user");
      expect(localStorage.getItem("email")).to.equal("testing@chatlink.com");
    })
  })

  it("should log user out", () => {
    console.log(localStorage.getItem("username"));
    cy.get(".nav-link").contains("Logout").click();

    cy.location("pathname", {timeout: 60000}).should("equal", "/");

    cy.window().then((win) => {
      expect(localStorage.getItem("username")).to.equal(null);
    })
  })
})
