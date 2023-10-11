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

  // it("should create new user from sign up", () => {

  //   // Open sign up page
  //   cy.get(".nav-link").contains("Signup").click();

  //   // Fill in the form
  //   cy.get("#email").type("testing@chatlink.com");
  //   cy.get("#username").type("test_user");
  //   cy.get("#password").type("Password1");

  //   // Submit the form
  //   cy.get("#signup-button").click();

  //   cy.location("pathname", {timeout: 60000}).should("equal", "/");

  //   cy.window().then((win) => {
  //     expect(localStorage.getItem("valid")).to.equal("true");
  //     expect(localStorage.getItem("username")).to.equal("test_user");
  //     expect(localStorage.getItem("email")).to.equal("testing@chatlink.com");
  //   })
  // })

  // it("should log user out", () => {
  //   cy.get(".nav-link").contains("Logout").click();

  //   cy.location("pathname", {timeout: 60000}).should("equal", "/");

  //   cy.window().then((win) => {
  //     expect(localStorage.getItem("username")).to.equal(null);
  //   })
  // })

  it("should log into the application", () => {
    cy.get(".nav-link").contains("Login").click();

    // Fill in the form
    cy.get("#username").type("super");
    cy.get("#password").type("123");

    // Submit the form
    cy.get("#login-button").click();

    cy.location("pathname", {timeout: 60000}).should("equal", "/");

    cy.window().then((win) => {
      expect(localStorage.getItem("valid")).to.equal("true");
      expect(localStorage.getItem("username")).to.equal("super");
      expect(localStorage.getItem("email")).to.equal("admin@chatlink.com");
    })
  })

  // it("should create a new group", () => {

  //   cy.get(".nav-link").contains("Manage Groups").click();

  //   cy.get("#name").type("End to End Group");
  //   cy.get("button").contains("Create Group").click();

  //   cy.wait(2000);
  //   cy.get(".list-group-item").contains("End to End Group").should("exist");
  // })

  it("should add a new channel to Open Group", () => {
    cy.get(".nav-link").contains("Manage Groups").click();
    cy.get(".list-group-item").contains("Open Group").click();

    cy.get("#name").type("Channel 4");
    cy.get("button").contains("Create Channel").click();

    cy.wait(2000);
    cy.get(".list-group-item").contains("Channel 4").should("exist");
  })

  it("should delete Channel 4 from Open Group", () => {
    cy.get(".nav-link").contains("Manage Groups").click();
    cy.get(".list-group-item").contains("Open Group").click();

    cy.get('.channel').contains('li', 'Channel 4').next('button').contains('Delete').click();

    cy.wait(2000);
    cy.get(".list-group-item").contains("Channel 4").should("not.exist");
  })
})
