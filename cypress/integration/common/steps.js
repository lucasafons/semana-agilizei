//steps associados a mais de uma feature

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