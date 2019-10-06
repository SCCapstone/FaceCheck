const functions = require("firebase-functions");
const admin = require("firebase-admin");
// Using express to better format REST api and handle errors
const app = require("express")();

admin.initializeApp();

// ----------------------------------------------------------------------------
// API Start
// ----------------------------------------------------------------------------

app.get("/helloWorld", (request, response) => {
  response.send("Hello from Firebase!");
});

// https://baseurl.com/api/ <- base url for all requests
exports.api = functions.https.onRequest(app);

// ----------------------------------------------------------------------------
// API End
// ---
// Event Triggers Start
// ----------------------------------------------------------------------------

exports.initializeUser = functions.auth.user().onCreate(user => {
  // Get value of user whitelist in database
  let userWhitelistEntry = admin
    .firestore()
    .collection("whitelist")
    .doc(user.email);
  // If user whitelisted then intialize users entry | Else log user not whitelisted
  userWhitelistEntry
    .get()
    .then(function(doc) {
      if (doc.exists) {
        let userData = {
          userType: doc.data().userType,
          classes: []
        };
        admin
          .firestore()
          .collection("users")
          .doc(user.uid)
          .set(userData);
        return true;
      } else {
        // doc.data() will be undefined in this case
        console.log(`User: ${user.uid} is not whitelisted`);
        return false;
      }
    }) /* Only happens on server error */
    .catch(function(error) {
      console.log("Error getting document:", error);
      return false;
    });
});

// ----------------------------------------------------------------------------
// Event Triggers End
// ----------------------------------------------------------------------------
