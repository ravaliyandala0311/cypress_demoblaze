describe("POST User Request", () => {
  let randomText = "";
  let testEmail = "";

  it("Create, Retrieve, and Delete User", () => {
    // Retrieve values from Cypress environment variables
    const accessToken = Cypress.env("accessToken");
    const apiBaseUrl = Cypress.env("apiBaseUrl");

    // Generate a random email
    let pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < 10; i++) {
      randomText += pattern.charAt(Math.floor(Math.random() * pattern.length));
    }
    testEmail = randomText + "@gmail.com";

    // Load payload data from fixture
    cy.fixture("createUser").then((payload) => {
      // Step 1: Create User (POST)
      cy.request({
        method: "POST",
        url: `${apiBaseUrl}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: {
          name: payload.name,
          gender: payload.gender,
          email: testEmail,
          status: payload.status,
        },
      }).then((createUserResponse) => {
        // Validate the create user response
        expect(createUserResponse.status).to.eq(201);
        expect(createUserResponse.body.data).to.have.property("email", testEmail);
        expect(createUserResponse.body.data).to.have.property("name", payload.name);
        expect(createUserResponse.body.data).to.have.property("status", payload.status);
        expect(createUserResponse.body.data).to.have.property("gender", payload.gender);

        const userId = createUserResponse.body.data.id; // Store user ID
        cy.log("User ID created: " + userId);

        // Step 2: Retrieve User (GET)
        cy.request({
          method: "GET",
          url: `${apiBaseUrl}/${userId}`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }).then((getUserResponse) => {
          // Validate the retrieve user response
          expect(getUserResponse.status).to.eq(200);
          expect(getUserResponse.body.data).to.have.property("id", userId);
          expect(getUserResponse.body.data).to.have.property("name", payload.name);
          expect(getUserResponse.body.data).to.have.property("status", payload.status);
          expect(getUserResponse.body.data).to.have.property("email", testEmail);
        });

        // Step 3: Delete User (DELETE)
        cy.request({
          method: "DELETE",
          url: `${apiBaseUrl}/${userId}`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }).then((deleteUserResponse) => {
          // Validate the delete response
          expect(deleteUserResponse.status).to.eq(204);
        });

        // Step 4: Verify User Deletion (GET with 404 check)
        cy.request({
          method: "GET",
          url: `${apiBaseUrl}/${userId}`,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          failOnStatusCode: false, // Do not fail the test on 404
        }).then((verifyDeleteResponse) => {
          // Validate that the user no longer exists
          expect(verifyDeleteResponse.status).to.eq(404);
          expect(verifyDeleteResponse.body.data).to.have.property("message", payload.message); // Check 404 message
        });
      });
    });
  });
});
