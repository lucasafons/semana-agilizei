// implementacao dos passos descritos nas features
/// <reference types="cypress"/>

let Chance = require("chance");
let chance = new Chance();

Given(/^que acesso o site$/, () => {
  // baseUrl + register.html
  cy.visit("/Register.html");

  //rotas
  cy.server();
  cy.route({
    method: "GET",
    url: "**/api.mlab.com/api/1/databases/userdetails/collections/newtable?**",
    status: 200,
    response: {},
  }).as("getNewtable");

  cy.route({
    method: "POST",
    url: "**/api.mlab.com/api/1/databases/userdetails/collections/newtable?**",
    status: 200,
    response: {},
  }).as("postNewtable");

  cy.route({
    method: "POST",
    url: "**/api.mlab.com/api/1/databases/userdetails/collections/usertable?**",
    status: 200,
    response: {},
  }).as("postUsertable");
});

When(/^informar meus dados$/, () => {
  //types
  cy.get("input[placeholder='First Name']").type(chance.first());
  cy.get("input[placeholder^=Last]").type(chance.last());
  cy.get("input[ng-model^=Email]").type(chance.email());
  cy.get("input[ng-model^=Phone]").type(chance.phone({ formatted: false }));

  //checkboxes
  cy.get("input[value=Male]").check();
  cy.get("input[type=checkbox]").check("Movies");
  cy.get("input[type=checkbox]").check("Cricket");

  //selects
  cy.get("select#Skills").select("Javascript");
  cy.get("select#countries").select("Algeria");
  cy.get("select#country").select("Denmark", { force: true }); //segura
  cy.get("select#yearbox").select("2000");
  cy.get("select[ng-model^=month]").select("April");
  cy.get("select#daybox").select("31");

  cy.get("input#firstpassword").type("Agilizei@2020");
  cy.get("input#secondpassword").type("Agilizei@2020");

  //upload image
  cy.get("input#imagesrc").attachFile("image-foto");
});

When(/^salvar$/, () => {
  //click
  cy.get("button#submitbtn").click();
});

Then(/^devo ser cadastrado com sucesso$/, () => {
  cy.wait('@postNewtable').then((resNewtable) => {
    //chai
    expect(resNewtable.status).to.eq(200)
  })

  cy.wait('@postUsertable').then((resUsertable) => {
    expect(resUsertable.status).to.eq(200)
  });
 
  cy.wait('@getNewtable').then((resNewtable) => {
    expect(resNewtable.status).to.eq(200)
  });

  cy.url().should('contain', 'WebTable');
});
